/* eslint no-constant-condition: "off" */
export class BetterRewriter extends HTMLRewriter {
  constructor(context) {
    super();
    this.context = context;
    this.data = {};
    this.url = new URL(context.request.url);

    this.on('script[type="ssr/d1"]', {
      element: this.ssrd1.bind(this),
    });
    this.on("[data-ssr-namespace]", {
      element: this.ssrNamespace.bind(this),
    });
  }

  async getD1Value(namespace, id, field) {
    const data = await this.data[namespace];

    if (!data) {
      return {
        error: "Data not found",
      };
    }

    if (!data.object) {
      data.object = {};
      this.data[namespace] = data;
    }

    if (data.object[id]) {
      return data.object[id][field];
    }

    do {
      const row = data.results.pop();
      if (!row) {
        return {
          error: "id not found",
        };
      }
      data.object[row.id] = row;
      if (row.id === id) {
        return row[field];
      }
    } while (true);
  }

  async ssrd1(element) {
    const name = element.getAttribute("data-name");
    const query = element.getAttribute("data-query");
    const database = element.getAttribute("data-database");

    this.data[name] = this.context.env[database]
      .prepare(query)
      .bind()
      .all()
      .catch((err) => {
        console.error(err);
      });

    element.remove();
  }

  async ssrNamespace(element) {
    const namespace = element.getAttribute("data-ssr-namespace");
    const id = element.getAttribute("data-ssr-id");
    const field = element.getAttribute("data-ssr-field");

    const value = await this.getD1Value(namespace, id, field);

    if (value.error) {
      element.setAttribute("data-ssr-namespace-error", value.error);
      return;
    }

    element.setInnerContent(value);
  }
}

export async function onRequestGet(context) {
  const upgradeHeader = context.request.headers.get("Upgrade");
  if (upgradeHeader === "websocket") {
    return context.next();
  }

  const url = new URL(context.request.url);
  const pageRequest = context.env.ASSETS.fetch(url);

  const rewriter = new BetterRewriter(context);

  return rewriter.transform(await pageRequest);
}
