function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class getJSON {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
    this.path = `../json/${this.jsonFile}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
}
