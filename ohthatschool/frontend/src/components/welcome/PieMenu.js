import React, {Component} from 'react';


export class PieMenu extends Component {

    render() {

        const goToInfoPage = () => {
            $('.js-scroll-trigger[data-href*="#"]:not([data-href="#"])').click(function () {
                let target = $($(this).attr('data-href'));
                console.log("I'm in js-scroll-trigger");
                // first hide the pages
                $('.index-info').fadeOut(500);
                // then show the target page
                target.fadeIn(500, function () {
                    // move to the page
                    $('html, body').animate({
                        scrollTop: ($('#info').offset().top - 70)
                    }, 500, "easeInOutExpo");
                    $('.go-to-top').show(500);
                });
                return false;
            });
        };

        const goToTop = () => {
            $('.go-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: ($('#page-top').offset().top - 140)
                }, 500, "easeInOutExpo");
                $('.go-to-top').hide(500);
                $('.index-info').fadeOut(1200);

                return false;
            });
        };

        return (
            <header className="index" style={{backgroundImage: "url('../../../static/img/bg-index.jpg')"}}>
                <div className="overlay"/>
                <div className="index-header">
                    <p>
                        <span>School is cool! Check all the cool things we've prepared for...</span>
                    </p>
                </div>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12">
                            <div className="container index-pie-container">
                                <div className="row index-pie-row">
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-student"
                                         onClick={goToInfoPage}>
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('../../../static/img/pie-student.jpg')"}}/>
                                        <div className="index-pie-text index-pie-student">Students</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-educator">
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('../../../static/img/pie-educator.jpg')"}}/>
                                        <div className="index-pie-text index-pie-educator">Educators</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-parent">
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('../../../static/img/pie-parent.jpg')"}}/>
                                        <div className="index-pie-text index-pie-parent">Parents</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-school">
                                        <div className="index-pie-col-background"
                                             style={{backgroundImage: "url('../../../static/img/pie-school.jpg')"}}/>
                                        <div className="index-pie-text index-pie-school">Schools</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="go-to-top" id="go-to-top">
                    <div className="go-to-top-text"><i className="icon-arrow-up"/></div>
                </div>
            </header>
        );
    }
}

export default PieMenu



