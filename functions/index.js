export async function onRequest(context) {
    const url = new URL(context.request.url);
    const pageRequest = context.env.ASSETS.fetch(url)

    const statisticsPromise = context.env.Spitofy_Statistics.prepare("SELECT slug, plays, reactions FROM tracks").bind().all();
    let statisticsArray;
    let statistics = {};

    async function getRow(slug, row) {
        if (statistics) {
            return statistics[slug][row];
        }

        statisticsArray ??= await statisticsPromise;

        do {
            const track = statisticsArray.pop();
            if (!track) {
                throw new Error("Track not found");
            }
            statistics[track.slug] = track;
            if (track.slug === slug) {
                return track[row];
            }
        } while (true);
    }
    
    const rewriter = new HTMLRewriter()
        .on('.plays[data-slug]', {
            async element(element) {
                const slug = element.getAttribute('data-slug');
                const value = await getRow(slug, "plays").toString();

                element.setInnerContent(`${value} play${value === "1" ? "" : "s"}`);
            }
        })
        .on('.reactions[data-slug]', {
            async element(element) {
                const slug = element.getAttribute('data-slug');
                const value = await getRow(slug, "reactions").toString();

                element.setInnerContent(`${value} reaction${value === "1" ? "" : "s"}`);
            }
        })
        
    return rewriter.transform(await pageRequest);
}