class Tabs {
    constructor(elt) {
        this.tabs = Array.from(elt.querySelectorAll('[data-tab-item]'))
        this.tabsContent = Array.from(
            elt.querySelectorAll('[data-tab-content]')
        )
        this.index = 1
    }

    evenHendler() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.changeTab(tab)
            })
            tab.addEventListener('focus', () => {
                console.log('this index', this.index)
                document.addEventListener('keyup', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        if (index < this.tabs.length - 1) {
                            this.index = index + 1
                            this.tabs[this.index].focus()
                        } else {
                            this.index = 0
                            this.tabs[this.index].focus()
                        }
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        if (index === 0) {
                            this.index = this.tabs.length - 1
                            this.tabs[this.index].focus()
                        } else {
                            this.index = index - 1
                            this.tabs[this.index].focus()
                        }
                    } else if (e.key === 'Enter') {
                        this.changeTab(tab)
                    }
                })
            })
        })
    }

    changeTab(tab) {
        const tabContent = this.tabsContent.find(
            (elt) => elt.id === tab.getAttribute('aria-controls')
        )
        this.hiddenTabsContent()
        this.resetTab()
        this.activeTab(tab)
        this.showTabContent(tabContent)
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
