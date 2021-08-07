# wettel
zettlekasten-ish app


# Currently running against a local mongo

## Start this on mac via

mongod --config /usr/local/etc/mongod.conf --fork

# Useful queries

{
  people {
    name
    role
    ooodoc {
      name
      link
    }
  }
}

{
  resources {
    name
    link
  }
}

mutation {
  addPerson(firstname: "", lastname: "", name: "", team: "", level: "", role: "") {
    firstname
    lastname
    name
    level
    role
    team
  }
}

mutation {
  addResource(name: "", link:"") {
    name
    link
    id
  }
}


mutation {
  addOooDoc(name:"", link:"", personId:"") {
    name
    link
    id
  }
}
