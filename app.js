const tabs = document.querySelectorAll('.js-tabs')

tabs.forEach((tab) => {
    const test = new Tabs(tab, {})
    test.init()
})
