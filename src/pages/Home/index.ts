import '../../assets/avatar-sm.jpg'
import '../../index.ts'
import './index.scss'
import $ from 'jquery'

$(document).ready(main)

function main() {
    new CodeAnimation()
}

class CodeAnimation {
    // JQuery Elements used
    animation_section = $("section.code-animation")
    animation_center = this.animation_section.find('.center') // Section used to wrap this Component
    templates = this.animation_center.find('pre.code') // Code templates, only one is visible at any time
    links = this.animation_center.find('pre.links').eq(0).children('a') // Clicable links that move around
    pose = 1 // Current pose number

    setIntervalRef: any

    constructor() {
        // Color the code
        this.colorCode()

        // Change the pose every second and render it        
        const startInterval = () => {
            this.setIntervalRef = setInterval(() => {
                this.setPose(this.pose, 200, 400)
                this.pose++
                if (this.pose > 4) this.pose = 1;
            }, 2000)
        }
        const stopInterval = () => {
            clearInterval(this.setIntervalRef)
        }

        startInterval()
        this.animation_section.hover(stopInterval, startInterval)
    }

    colorCode() {
        for (let i = 0; i < this.templates.length; i++) {
            const element = this.templates.eq(i);
            element.html(getColoredInnerHTML(element))
        }

        function getColoredInnerHTML(el: JQuery<HTMLElement>) {
            return el.html()
                .replace(/(await)|(try) /g, (match) => `<span class="syntax">${match} </span>`)
                .replace(/(then)|(finally)|(pipe)|(map)|(all)|(subscribe)/g, (match) => `<span class="function">${match}</span>`)
                .replace(/(Promise)/g, (match) => `<span class="class">${match}</span>`)
                .replace(/(visitors)/g, (match) => `<span class="name">${match}</span>`)
        }
    }

    setPose(pose: number, code_transition_duration: number, links_transition_duration: number) {
        const { templates } = this
        // For each code template, fade in the one that matches the current pose, 
        // and fade out the ones that don't
        templates.each(function () {
            if (parseInt($(this).attr('pose')) != pose) {
                $(this).animate({ opacity: 0 }, code_transition_duration)
            } else {
                $(this).animate({ opacity: 1 }, code_transition_duration)
            }
        })

        // For each link find the matching invisible links in the template,
        // and move to the same position
        this.links.each(function (i) {
            const link_position = templates.eq(pose - 1).children('a').eq(i).position()
            $(this).delay(code_transition_duration / 3).animate(
                {
                    top: link_position.top,
                    left: link_position.left
                }, links_transition_duration
            )
        })
    }
}


