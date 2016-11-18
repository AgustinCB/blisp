class Environment {
  constructor () {
    this.namespaces = new Map()
    this.namespacesPile = []
    this.addNamespace('global')
  }

  addNamespace (name) {
    const namespace = new Map()

    if (this.namespaces.has(name)) {
      name = name + Math.random().toString(36).substring(7)
    }

    namespace.name = name
    this.namespaces.set(name, namespace)
    this.namespacesPile.push(namespace)

    return name
  }

  popNamespace () {
    if (this.namespaces.length === 1) {
      return null;
    }
    const namespace = this.namespacesPile.pop()
    this.namespaces.delete(namespace.name)
    return namespace
  }

  set (name, value, environment) {
    const namespace = environment?
      this.namespaces.get(environment) :
      this.namespacesPile.slice(-1)[0]
    namespace.set(name, value)
  }

  get (name) {
    for (let i = this.namespacesPile.length - 1; i >= 0; i --) {
      const namespace = this.namespacesPile[i]
      if (namespace.has(name)) {
        return namespace.get(name)
      }
    }
  }
}

export default new Environment()
