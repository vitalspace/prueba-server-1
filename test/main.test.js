import * as chai from "chai";
import chaiHttp from "chai-http";
import { app, server } from "../app.js";

const chaiRequest = chai.use(chaiHttp).request;

describe("API ENDPOINT /api/getpokemon/?name=pikachu", () => {
  it("Should return an object", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=pikachu")
      .then((res) => {
        chai.expect(res.body).to.be.an("object");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return an object and have properties id, name, sprites, move", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=pikachu")
      .then((res) => {
        chai.expect(res.body).to.have.property("id");
        chai.expect(res.body).to.have.property("name");
        chai.expect(res.body).to.have.property("sprites");
        chai.expect(res.body).to.have.property("move");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should have the name property with the value pikachu, should have the id property with the value 25, and the length of sprites should be 2", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=pikachu")
      .then((res) => {
        chai.expect(res.body).to.be.property("name", "pikachu");
        chai.expect(res.body).to.be.property("id", 25);
        chai.expect(res.body.sprites).to.have.lengthOf(2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a property message with the value: The unknown pokemon was not found", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=unknown")
      .then((res) => {
        chai
          .expect(res.body)
          .to.be.property("message", "The unknown pokemon was not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a property message with value: The name parameter is required", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/")
      .then((res) => {
        chai
          .expect(res.body)
          .to.be.property("message", "The name parameter is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

});

describe("API ENDPOINT /api/getramdompokemon", () => {
  it("Should return an object", (done) => {
    chaiRequest(app)
      .get("/api/getramdompokemon")
      .then((res) => {
        chai.expect(res.body).to.be.an("object");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return an object with properties id, name, sprites, move", (done) => {
    chaiRequest(app)
      .get("/api/getramdompokemon")
      .then((res) => {
        chai.expect(res.body).to.have.property("id");
        chai.expect(res.body).to.have.property("name");
        chai.expect(res.body).to.have.property("sprites");
        chai.expect(res.body).to.have.property("move");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("API ENDPOINT /api/getpokemonbyrange", () => {
  it("Should return an array", (done) => {
    chaiRequest(app)
      .get("/api/getpokemonbyrange/?start=3&end=10")
      .then((res) => {
        chai.expect(res.body).to.be.an("array");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return an array of 10 elements", (done) => {
    chaiRequest(app)
      .get("/api/getpokemonbyrange/?start=3&end=10")
      .then((res) => {
        chai.expect(res.body).to.have.lengthOf(8);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a property message with value: Start and End parameters are required", (done) => {
    chaiRequest(app)
      .get("/api/getpokemonbyrange/?start=&end=")
      .then((res) => {
        chai
          .expect(res.body)
          .to.have.property("message", "Start and End parameters are required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Api STATUS /api/getpokemon/?name=pikachu", () => {
  it("The Response status should be 200 if a pokemon is found", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=pikachu")
      .then((res) => {
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("The Response status should be 400 if no pokemon is found", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?name=unknown")
      .then((res) => {
        chai.expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("The Response status should be 400 if incorrect or empty parameters are entered", (done) => {
    chaiRequest(app)
      .get("/api/getpokemon/?")
      .then((res) => {
        chai.expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


});

describe("Api STATUS /api/getramdompokemon", () => {
  it("The Response status should be 200 if a random pokemon is found", (done) => {
    chaiRequest(app)
      .get("/api/getramdompokemon")
      .then((res) => {
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Api STATUS /api/getpokemonbyrange", () => {
  it("The Response status should be 200 if a range of pokemons is found", (done) => {
    chaiRequest(app)
      .get("/api/getpokemonbyrange/?start=3&end=10")
      .then((res) => {
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("The Response status should be 400 if incorrect or empty parameters are entered", (done) => {
    chaiRequest(app)
      .get("/api/getpokemonbyrange/?start=&end=")
      .then((res) => {
        chai.expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

});

// Closes the server after the tests

after(() => {
  server.close();
});
