export const testCases = [
  {
    name: "Missing Alt",
    html: `<img src="logo.png">`
  },
  {
    name: "Empty Button",
    html: `<button></button>`
  },
  {
    name: "Proper Form",
    html: `
      <label for="email">Email</label>
      <input id="email" type="email">
      <button>Submit</button>
    `
  }
];