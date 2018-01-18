declare module '*.json' {
  const json: {
    slack: {
      channel: {
        labs: string
      }
    }
  }
  export = json
}
