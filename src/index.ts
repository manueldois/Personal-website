// App level script
import $ from 'jquery'

$(document).ready(main)

function main() {
    new Navbar()
}

/**
 * Navbar collapse. Gets the width of the children
 * in nav, if their sum is larger than window width,
 * collapse, else expand.
 */
class Navbar {
    nav = $('nav').eq(0)
    nav_children_sum_width: number
    nav_x_padding: number
    isCollapsed: boolean

    constructor() {
        if (this.nav) {
            // Fired ONCE and remember the result
            this.getNavChildrenSumWidths()
            this.getNavXPadding()

            this.setCorrectNavbarState()

            // Listen to resizes
            this.nav.on('resize', () => this.setCorrectNavbarState())
            window.addEventListener('resize', () => this.setCorrectNavbarState())
        }
    }

    getNavChildrenSumWidths() {
        const nav_children = this.nav.children()
        let sum_width = 0
        nav_children.each(function (i) {
            sum_width += $(this).width()
        })

        this.nav_children_sum_width = sum_width
    }

    getNavXPadding(){
        this.nav_x_padding = 
            parseInt(this.nav.css('padding-left')) +
            parseInt(this.nav.css('padding-right'))
    }

    setCorrectNavbarState() {
        if (window.innerWidth - this.nav_x_padding < this.nav_children_sum_width) {
            this.isCollapsed = true
            this.nav.addClass('collapsed')
        } else {
            this.isCollapsed = false
            this.nav.removeClass('collapsed')
        }
    }

}