import './index.scss'
import $ from 'jquery'
import { isMainThread } from 'worker_threads'
console.log('homepage')

colorCode()
function colorCode() {

    const all_code = document.getElementsByClassName('code')

    for (let i = 0; i < all_code.length; i++) {
        const element = <HTMLElement>all_code.item(i);
        element.innerHTML = colorInnerHTML(element)
    }

    function colorInnerHTML(el: HTMLElement) {
        return el.innerHTML
            .replace(/(await)|(try) /g, (match) => `<span class="syntax">${match} </span>`)
            .replace(/(then)|(finally)|(pipe)|(map)|(all)|(subscribe)/g, (match) => `<span class="function">${match}</span>`)
            .replace(/(Promise)/g, (match) => `<span class="class">${match}</span>`)
            .replace(/(visitors)/g, (match) => `<span class="name">${match}</span>`)
    }
}



$(document).ready(main)

class CodeAnimation {
    // JQuery Elements used
    animation_section = $("section.code-animation")
    animation_center = this.animation_section.find('.center') // Section used to wrap this Component
    templates = this.animation_center.find('pre.code') // Code templates, only one is visible at any time
    links = this.animation_center.find('pre.links').eq(0).children('a') // Clicable links that move around
    pose = 1 // Current pose number

    setIntervalRef: any

    constructor() {
        // Set the initial pose ASAP so the elements dont look stacked
        // this.setPose(this.pose, 0, 0)

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
                    top: link_position.top - 3,
                    left: link_position.left
                }, links_transition_duration
            )
        })
    }
}

function main() {
    const codeAnimation = new CodeAnimation()
}
