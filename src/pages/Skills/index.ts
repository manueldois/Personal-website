import './index.scss'
import $ from 'jquery'
import '../../index.ts'
import '../../assets/angular.svg'
import '../../assets/css3.svg'
import '../../assets/digitalocean.svg'
import '../../assets/esnext.png'
import '../../assets/ionic.svg'
import '../../assets/html5.svg'
import '../../assets/sass.svg'
import '../../assets/git.svg'
import '../../assets/graphql.svg'
import '../../assets/google_cloud.svg'
import '../../assets/linux.svg'
import '../../assets/jquery.svg'
import '../../assets/mongodb.svg'
import '../../assets/neo4j.svg'
import '../../assets/nodejs.svg'
import '../../assets/reactjs.svg'
import '../../assets/typescriptlang.svg'
import '../../assets/webassembly.svg'
import '../../assets/webpack.svg'

import '../../assets/gimp.svg'
import '../../assets/gravitio.svg'
import '../../assets/whimsical.png'

import '../../assets/vcw.png'
import '../../assets/graduation.svg'


// Make the figures fade-in when the <details> is opened
$("main > section > details").on('toggle', function(e){
    const figures = $(this).find('figure')
    figures.stop(true, true)
    if(e.target["open"]){
        fadeInFiguresInSequence(figures)
    }
})

// And once on start for the details that are open
fadeInFiguresInSequence($("main > section > details[open]").find('figure'))


function fadeInFiguresInSequence(figures: JQuery<HTMLElement>){
    figures.css('opacity',0)
    figures.each(function(i){
        $(this).delay(i * 300).animate({opacity: 1}, 700)
    })
}