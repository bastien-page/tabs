class Tabs {
    constructor(elt) {
        this.tabs = elt.querySelectorAll('[data-tab-item]')
        this.tabsContent = Array.from(
            elt.querySelectorAll('[data-tab-content]')
        )
    }

    evenHendler() {
        this.tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const tabContent = this.tabsContent.find(
                    (elt) => elt.id === tab.getAttribute('aria-controls')
                )
                this.hiddenTabsContent()
                this.resetTab()
                this.activeTab(tab)
                this.showTabContent(tabContent)
            })
        })
    }

    hiddenTabsContent() {
        this.tabsContent.forEach((tabContent) => {
            if (tabContent.classList.contains('is-show')) {
                tabContent.classList.remove('is-show')
                tabContent.classList.add('d-none')
            }
        })
    }

    resetTab() {
        this.tabs.forEach((tab) => {
            tab.classList.remove('is-active')
            tab.setAttribute('aria-selected', 'false')
            tab.setAttribute('tabindex', '-1')
        })
    }

    showTabContent(tabContent) {
        tabContent.classList.add('is-show')
    }

    activeTab(tab) {
        tab.classList.add('is-active')
        tab.setAttribute('aria-selected', 'true')
        tab.setAttribute('tabindex', '0')
    }

    init() {
        this.evenHendler()
    }
}
