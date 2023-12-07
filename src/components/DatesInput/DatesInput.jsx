import styles from "./DatesInput.module.scss";

export function DatesInput() {
  return (
    <form class={styles.DatesInput} method="dialog">
      <h2>Book a date for a Show</h2>
      <fieldset>
        <label>Contact:</label>
        <input
          type="email"
          placeholder="The email address I will use to contact you"
          required
        />
        <label>Date:</label>
        <textarea
          rows="5"
          placeholder="Enter everything you consider worth sharing about the show, like the date, country, city, place, etc."
        />
      </fieldset>
      <button>Booking</button>
    </form>
  );
}
