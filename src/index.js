import "./styles.scss";

let list = [
  {
    type: "folder",
    name: "Level 1-1",
    content: [
      {
        type: "folder",
        name: "Level 2-1",
        content: [
          {
            type: "folder",
            name: "Level 3-1",
            content: []
          },
          {
            type: "file",
            name: "Level 3-2",
            extension: "exe"
          }
        ]
      },
      {
        type: "file",
        name: "Level 2-2",
        extension: "exe"
      }
    ]
  },
  {
    type: "folder",
    name: "Level 1-2",
    content: [
      {
        type: "folder",
        name: "Level 1-1",
        content: [
          {
            type: "folder",
            name: "Level 2-1",
            content: [
              {
                type: "folder",
                name: "Level 3-1",
                content: []
              },
              {
                type: "file",
                name: "Level 3-2",
                extension: "exe"
              }
            ]
          },
          {
            type: "file",
            name: "Level 2-2",
            extension: "exe"
          }
        ]
      }
    ]
  },
  {
    type: "file",
    name: "Level 1-3",
    extension: "png"
  },
  {
    type: "folder",
    name: "MAX Lavel",
    content: [
      {
        type: "folder",
        name: "Level 2-1",
        content: [
          {
            type: "folder",
            name: "Level 3-1",
            content: []
          },
          {
            type: "file",
            name: "Level 3-2",
            extension: "exe"
          }
        ]
      },
      {
        type: "folder",
        name: "Level 2-1",
        content: [
          {
            type: "folder",
            name: "Level 3-1",
            content: []
          },
          {
            type: "file",
            name: "Level 3-2",
            extension: "exe"
          }
        ]
      }
    ]
  }
];

// console.log(list);

class Manager {
  constructor(list, root) {
    if (!list) {
      new Error("List is Empty!");
      return false;
    }

    this.list = list;
    this.rootClass = "manager";
    this.root = root || document.body;
    this.tmp = document.createDocumentFragment();

    this.init();
  }

  ce(className = "", tag = "div") {
    let tmp = document.createElement(tag);
    if (className) tmp.classList.add(className);
    return tmp;
  }

  edit(item, value) {}
  delete(item) {}

  generateItem(item, contentTmp = false) {
    let tmp = this.ce(this.rootClass + "__item");
    let element, content;
    if (item.type === "folder") {
      element = this.ce(this.rootClass + "__folder");
      element.innerText = item.name;
      element.addEventListener("click", (ev) => {
        element.classList.toggle("active");
      });

      if (!item.content.length) element.classList.add("empty");

      if (item.content) {
        console.log("content");
        content = this.ce(this.rootClass + "__content");
        content.append(contentTmp);
      }
    }

    if (item.type === "file") {
      element = this.ce(this.rootClass + "__file");
      element.innerText = item.name;
    }

    tmp.append(element);
    if (content) tmp.append(content);
    return tmp;
  }

  recursive(item) {
    let tmp = document.createDocumentFragment();

    item.content.forEach((el) => {
      switch (el.type) {
        case "folder":
          tmp.append(this.generateItem(el, this.recursive(el)));
          break;
        default:
          tmp.append(this.generateItem(el, false));
          break;
      }
    });

    return tmp;
  }

  init() {
    let tmp = document.createDocumentFragment();
    this.list.forEach((item) => {
      switch (item.type) {
        case "folder":
          tmp.append(this.generateItem(item, this.recursive(item)));
          break;
        default:
          tmp.append(this.generateItem(item, false));
          break;
      }
    });

    this.tmp.append(tmp);
    this.render();
  }

  render() {
    let managerNode = document.createElement("div");
    managerNode.classList.add("manager");
    console.log("tmp: ", this.tmp);
    managerNode.append(this.tmp);
    this.root.append(managerNode);
  }
}

let manager = new Manager(list);
