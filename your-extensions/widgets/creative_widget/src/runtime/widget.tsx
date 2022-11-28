
import {React,jsx,AllWidgetProps} from 'jimu-core'
// import '../assets/images/favicon.ico';
import '../assets/css/vendor.css';
// import '../assets/css/core.css';
import '../assets/css/main_css.css'
import '../assets/css/icons.min.css';
import '../assets/css/vendor/jquery-jvectormap-1.2.2.css';
import '../assets/css/app-creative-dark.min.css';
import '../assets/css/app-creative.min.css';
const darrImage = require('../assets/images/logo-light.png')
const usImage = require('../assets/images/flags/us.jpg')
const germanyFlag = require('../assets/images/flags/germany.jpg')
const italyFlag = require ('../assets/images/flags/italy.jpg')
const spainFlag = require ('../assets/images/flags/spain.jpg')
const russiaFlag = require('../assets/images/flags/russia.jpg')
const avatar1 = require("../assets/images/users/avatar-1.jpg")
const avatar2 = require ('../assets/images/users/avatar-2.jpg')
const avatar4 = require ('../assets/images/users/avatar-4.jpg')
const slackImage = require ('../assets/images/brands/slack.png')
const gitHubImage = require('../assets/images/brands/github.png')
const dribbleImage = require ("../assets/images/brands/dribbble.png")
const bitbucketImage = require('../assets/images/brands/bitbucket.png')
const dropboxImage = require("../assets/images/brands/dropbox.png")
const gsuiteImage = require('../assets/images/brands/g-suite.png')


export default class CreativeWidget extends React.PureComponent<AllWidgetProps<any>,any>{

    render(): React.ReactNode {
        return(
            <div className="loading" data-layout="topnav" data-layout-config='{"layoutBoxed":false,"darkMode":false,"showRightSidebarOnStart": true}'>
              <div className = "wrapper">
                <div className = "content-page">
                    <div className = "content">
                        <div className = "navbar-custom topnav-navbar topnav-navbar-dark">
                            <div className = "container-fluid">
                                <a href="" className = "topnav-logo">
                                    <span className = "topnav-logo-lg">
                                        <img src={darrImage} alt="" height="16" />
                                    </span>
                                    <span className="topnav-logo-sm">
                                        <img src="assets/images/logo_sm_dark.png" alt="" height="16" />
                                    </span>
                                </a>

                                <ul className="list-unstyled topbar-menu float-end mb-0">
                                    
                                    <li className ="dropdown notification-list d-xl-none">
                                        <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                            <i className="dripicons-search noti-icon"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                            <form className="p-3">
                                                <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                            </form>
                                        </div>
                                    </li>

                                    <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                                        <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" id="topbar-languagedrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                            <img src={usImage} alt="user-image" className="me-1" height="12" /> <span className="align-middle">English</span> <i className="mdi mdi-chevron-down align-middle"></i>
                                        </a>
                                        <div className = "dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu" aria-labelledby="topbar-languagedrop">

                                            <a href="javascript:void(0);" className = "dropdown-item notify-item">
                                                <img src={germanyFlag} alt="user-image" className="me-1" height="12" /> <span className="align-middle">German</span>
                                            </a>

                                            <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                <img src={italyFlag} alt="user-image" className="me-1" height="12" /> <span className ="align-middle">Italian</span>
                                            </a>
                        
                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <img src={spainFlag} alt="user-image" className="me-1" height="12" /> <span className ="align-middle">Spanish</span>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <img src={russiaFlag} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                                            </a>

                                        </div>
                                    </li>

                                    <li className = "dropdown notification-list">
                                        <a className ="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" id="topbar-notifydrop" role="button" aria-haspopup="true" aria-expanded="false">
                                            <i className = "dripicons-bell noti-icon"></i>
                                            <span className ="noti-icon-badge"></span>
                                        </a>
                                        <div className = "dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg" aria-labelledby="topbar-notifydrop">
                                            <div className = "dropdown-item noti-title">
                                                <h5 className = "m-0">
                                                    <span className = "float-end">
                                                        <a href="javascript: void(0);" className = "text-dark">
                                                            <small>Clear All</small>
                                                        </a>
                                                    </span>Notification
                                                </h5>
                                            </div>

                                            <div style = {{maxHeight:230}} data-simplebar>
                                                
                                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-primary">
                                                        <i className="mdi mdi-comment-account-outline"></i>
                                                    </div>
                                                    <p className="notify-details">Caleb Flakelar commented on Admin
                                                        <small className="text-muted">1 min ago</small>
                                                    </p>
                                                </a>

                                                <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                    <div className ="notify-icon bg-info">
                                                        <i className ="mdi mdi-account-plus"></i>
                                                    </div>
                                                    <p className = "notify-details">New user registered.
                                                        <small className ="text-muted">5 hours ago</small>
                                                    </p>
                                                </a>

                                                <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                    <div className = "notify-icon">
                                                        <img src={avatar2} className ="img-fluid rounded-circle" alt="" /> 
                                                    </div>
                                                    <p className = "notify-details">Cristina Pride</p>
                                                    <p className ="text-muted mb-0 user-msg">
                                                        <small>Hi, How are you? What about our next meeting</small>
                                                    </p>
                                                </a>

                                                <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                    <div className ="notify-icon bg-primary">
                                                        <i className ="mdi mdi-comment-account-outline"></i>
                                                    </div>
                                                    <p className ="notify-details">Caleb Flakelar commented on Admin
                                                        <small className ="text-muted">4 days ago</small>
                                                    </p>
                                                </a>

                                                <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                    <div className ="notify-icon">
                                                        <img src={avatar4} className ="img-fluid rounded-circle" alt="" /> </div>
                                                    <p className = "notify-details">Karen Robinson</p>
                                                    <p className ="text-muted mb-0 user-msg">
                                                        <small>Wow ! this admin looks good and awesome design</small>
                                                    </p>
                                                </a>

                                                <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                    <div className ="notify-icon bg-info">
                                                        <i className = "mdi mdi-heart"></i>
                                                    </div>
                                                    <p className ="notify-details">Carlos Crouch liked
                                                        <b>Admin</b>
                                                        <small className ="text-muted">13 days ago</small>
                                                    </p>
                                                </a>
                                            </div>

                                            <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
                                                View All
                                            </a>

                                        </div>
                                    </li>

                                    <li className ="dropdown notification-list d-none d-sm-inline-block">
                                        <a className ="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                            <i className ="dripicons-view-apps noti-icon"></i>
                                        </a>
                                        <div className ="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">

                                            <div className ="p-2">
                                                <div className ="row g-0">
                                                    <div className ="col">
                                                        <a className ="dropdown-icon-item" href="#">
                                                            <img src={slackImage} alt="slack" />
                                                            <span>Slack</span>
                                                        </a>
                                                    </div>
                                                    <div className ="col">
                                                        <a className ="dropdown-icon-item" href="#">
                                                            <img src={gitHubImage} alt="Github" />
                                                            <span>GitHub</span>
                                                        </a>
                                                    </div>
                                                    <div className ="col">
                                                        <a className ="dropdown-icon-item" href="#">
                                                            <img src={dribbleImage} alt="dribbble" />
                                                            <span>Dribbble</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="row g-0">
                                                    <div className="col">
                                                        <a className="dropdown-icon-item" href="#">
                                                            <img src={bitbucketImage} alt="bitbucket" />
                                                            <span>Bitbucket</span>
                                                        </a>
                                                    </div>
                                                    <div className="col">
                                                        <a className="dropdown-icon-item" href="#">
                                                            <img src={dropboxImage} alt="dropbox" />
                                                            <span>Dropbox</span>
                                                        </a>
                                                    </div>
                                                    <div className="col">
                                                        <a className="dropdown-icon-item" href="#">
                                                            <img src={gsuiteImage} alt="G Suite" />
                                                            <span>G Suite</span>
                                                        </a>
                                                    </div>
                    
                                                </div>
                                            </div>

                                        </div>
                                    </li>

                                    <li className="notification-list">
                                        <a className="nav-link end-bar-toggle" href="javascript: void(0);">
                                            <i className="dripicons-gear noti-icon"></i>
                                        </a>
                                    </li>

                                    <li className = "dropdown notification-list">
                                        
                                        <a className = "nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" id="topbar-userdrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                            <span className = "account-user-avatar"> 
                                                <img src={avatar1} alt="user-image" className = "rounded-circle" />
                                            </span>
                                            <span>
                                                <span className ="account-user-name">Dominic Keller</span>
                                                <span className ="account-position">Founder</span>
                                            </span>
                                        </a>
                                        
                                        <div className ="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown" aria-labelledby="topbar-userdrop">
                                            
                                            <div className = "dropdown-header noti-title">
                                                <h6 className ="text-overflow m-0">Welcome !</h6>
                                            </div>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <i className ="mdi mdi-account-circle me-1"></i>
                                                <span>My Account</span>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <i className="mdi mdi-account-edit me-1"></i>
                                                <span>Settings</span>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <i className="mdi mdi-lifebuoy me-1"></i>
                                                <span>Support</span>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <i className="mdi mdi-lock-outline me-1"></i>
                                                <span>Lock Screen</span>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <i className="mdi mdi-logout me-1"></i>
                                                <span>Logout</span>
                                            </a>

                                        </div>
                                    </li>

                                </ul>
                                <a className ="navbar-toggle"  data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                                    <div className ="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                                <div className ="app-search dropdown">
                                    
                                    <form>
                                        <div className ="input-group">
                                            <input type="text" className ="form-control" placeholder="Search..." id="top-search" />
                                            <span className ="mdi mdi-magnify search-icon"></span>
                                            <button className ="input-group-text btn-primary" type="submit">Search</button>
                                        </div>
                                    </form>

                                    <div className ="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                                        
                                        <div className ="dropdown-header noti-title">
                                            <h5 className = "text-overflow mb-2">Found <span className ="text-danger">17</span> results</h5>
                                        </div>

                                        <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                            <i className ="uil-notes font-16 me-1"></i>
                                            <span>Analytics Report</span>
                                        </a>

                                        <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                            <i className ="uil-life-ring font-16 me-1"></i>
                                            <span>How can I help you?</span>
                                        </a>

                                        <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                            <i className ="uil-cog font-16 me-1"></i>
                                            <span>User profile settings</span>
                                        </a>

                                        <div className ="dropdown-header noti-title">
                                            <h6 className ="text-overflow mb-2 text-uppercase">Users</h6>
                                        </div>

                                        <div className ="notification-list">
                                            <a href="javascript:void(0);" className ="dropdown-item notify-item">
                                                <div className="d-flex">
                                                    {/* <img className ="d-flex me-2 rounded-circle" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32" /> */}
                                                    <div className="w-100">
                                                        <h5 className="m-0 font-14">Erwin Brown</h5>
                                                        <span className ="font-12 mb-0">UI Designer</span>
                                                    </div>
                                                </div>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                                <div className ="d-flex">
                                                    {/* <img className="d-flex me-2 rounded-circle" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32" /> */}
                                                    <div className="w-100">
                                                        <h5 className ="m-0 font-14">Jacob Deo</h5>
                                                        <span className ="font-12 mb-0">Developer</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className ="topnav shadow-sm">
                            <div className ="container-fluid">
                                <nav className ="navbar navbar-light navbar-expand-lg topnav-menu">
                                    <div className ="collapse navbar-collapse" id="topnav-menu-content">
                                        <ul className ="navbar-nav">
                                            
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-dashboards" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="uil-dashboard me-1"></i>Dashboards <div className="arrow-down"></div>
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="topnav-dashboards">
                                                    <a href="dashboard-analytics.html" className="dropdown-item">Analytics</a>
                                                    <a href="dashboard-crm.html" className="dropdown-item">CRM</a>
                                                    <a href="index.html" className="dropdown-item">Ecommerce</a>
                                                    <a href="dashboard-projects.html" className="dropdown-item">Projects</a>
                                                </div>
                                            </li>
                                            
                                            <li className="nav-item dropdown">
                                                
                                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-apps" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="uil-apps me-1"></i>Apps <div className="arrow-down"></div>
                                                </a>
                                                
                                                <div className="dropdown-menu" aria-labelledby="topnav-apps">
                                                    
                                                    <a href="apps-calendar.html" className="dropdown-item">Calendar</a>
                                                    <a href="apps-chat.html" className="dropdown-item">Chat</a>
                                                    <div className ="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ecommerce" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Ecommerce <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-ecommerce">
                                                            <a href="apps-ecommerce-products.html" className="dropdown-item">Products</a>
                                                            <a href="apps-ecommerce-products-details.html" className="dropdown-item">Products Details</a>
                                                            <a href="apps-ecommerce-orders.html" className="dropdown-item">Orders</a>
                                                            <a href="apps-ecommerce-orders-details.html" className="dropdown-item">Order Details</a>
                                                            <a href="apps-ecommerce-customers.html" className="dropdown-item">Customers</a>
                                                            <a href="apps-ecommerce-shopping-cart.html" className="dropdown-item">Shopping Cart</a>
                                                            <a href="apps-ecommerce-checkout.html" className="dropdown-item">Checkout</a>
                                                            <a href="apps-ecommerce-sellers.html" className="dropdown-item">Sellers</a>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-email" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Email <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-email">
                                                            <a href="apps-email-inbox.html" className="dropdown-item">Inbox</a>
                                                            <a href="apps-email-read.html" className="dropdown-item">Read Email</a>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-project" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Projects <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-project">
                                                            <a href="apps-projects-list.html" className="dropdown-item">List</a>
                                                            <a href="apps-projects-details.html" className="dropdown-item">Details</a>
                                                            <a href="apps-projects-gantt.html" className="dropdown-item">Gantt</a>
                                                            <a href="apps-projects-add.html" className="dropdown-item">Create Project</a>
                                                        </div>
                                                    </div>
                                                    <a href="apps-social-feed.html" className="dropdown-item">Social Feed</a>
                                                    <div className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-tasks" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Tasks <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-tasks">
                                                            <a href="apps-tasks.html" className="dropdown-item">List</a>
                                                            <a href="apps-tasks-details.html" className="dropdown-item">Details</a>
                                                            <a href="apps-kanban.html" className="dropdown-item">Kanban Board</a>
                                                        </div>
                                                    </div>
                                                    <a href="apps-file-manager.html" className="dropdown-item">File Manager</a>
                                                </div>
                                            </li>
                                            
                                            <li className="nav-item dropdown">
                                                
                                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="uil-copy-alt me-1"></i>Pages <div className="arrow-down"></div>
                                                </a>
                                                
                                                <div className="dropdown-menu" aria-labelledby="topnav-pages">
                                                    <div className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-auth" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Authenitication <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-auth">
                                                            <a href="pages-login.html" className="dropdown-item">Login</a>
                                                            <a href="pages-login-2.html" className="dropdown-item">Login 2</a>
                                                            <a href="pages-register.html" className="dropdown-item">Register</a>
                                                            <a href="pages-register-2.html" className="dropdown-item">Register 2</a>
                                                            <a href="pages-logout.html" className="dropdown-item">Logout</a>
                                                            <a href="pages-logout-2.html" className="dropdown-item">Logout 2</a>
                                                            <a href="pages-recoverpw.html" className="dropdown-item">Recover Password</a>
                                                            <a href="pages-recoverpw-2.html" className="dropdown-item">Recover Password 2</a>
                                                            <a href="pages-lock-screen.html" className="dropdown-item">Lock Screen</a>
                                                            <a href="pages-lock-screen-2.html" className="dropdown-item">Lock Screen 2</a>
                                                            <a href="pages-confirm-mail.html" className="dropdown-item">Confirm Mail</a>
                                                            <a href="pages-confirm-mail-2.html" className="dropdown-item">Confirm Mail 2</a>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-error" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Error <div className="arrow-down"></div>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="topnav-error">
                                                            <a href="pages-404.html" className="dropdown-item">Error 404</a>
                                                            <a href="pages-404-alt.html" className="dropdown-item">Error 404-alt</a>
                                                            <a href="pages-500.html" className="dropdown-item">Error 500</a>
                                                        </div>
                                                    </div>
                                                    <a href="pages-starter.html" className="dropdown-item">Starter Page</a>
                                                    <a href="pages-preloader.html" className="dropdown-item">With Preloader</a>
                                                    <a href="pages-profile.html" className="dropdown-item">Profile</a>
                                                    <a href="pages-profile-2.html" className="dropdown-item">Profile 2</a>
                                                    <a href="pages-invoice.html" className="dropdown-item">Invoice</a>
                                                    <a href="pages-faq.html" className="dropdown-item">FAQ</a>
                                                    <a href="pages-pricing.html" className="dropdown-item">Pricing</a>
                                                    <a href="pages-maintenance.html" className="dropdown-item">Maintenance</a>
                                                    <a href="pages-timeline.html" className="dropdown-item">Timeline</a>
                                                    <a href="landing.html" className="dropdown-item">Landing</a>
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="uil-package me-1"></i>Components <div className="arrow-down"></div>
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="topnav-components">
                                                    <a href="widgets.html" className="dropdown-item">Widgets</a>
                                                    <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ui-kit" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Base UI 1 <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-ui-kit">
                                                        <a href="ui-accordions.html" className="dropdown-item">Accordions</a>
                                                        <a href="ui-alerts.html" className="dropdown-item">Alerts</a>
                                                        <a href="ui-avatars.html" className="dropdown-item">Avatars</a>
                                                        <a href="ui-badges.html" className="dropdown-item">Badges</a>
                                                        <a href="ui-breadcrumb.html" className="dropdown-item">Breadcrumb</a>
                                                        <a href="ui-buttons.html" className="dropdown-item">Buttons</a>
                                                        <a href="ui-cards.html" className ="dropdown-item">Cards</a>
                                                        <a href="ui-carousel.html" className="dropdown-item">Carousel</a>
                                                        <a href="ui-dropdowns.html" className="dropdown-item">Dropdowns</a>
                                                        <a href="ui-embed-video.html" className="dropdown-item">Embed Video</a>
                                                        <a href="ui-grid.html" className="dropdown-item">Grid</a>
                                                        <a href="ui-list-group.html" className="dropdown-item">List Group</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ui-kit2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Base UI 2 <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-ui-kit2">
                                                        <a href="ui-modals.html" className="dropdown-item">Modals</a>
                                                        <a href="ui-notifications.html" className="dropdown-item">Notifications</a>
                                                        <a href="ui-offcanvas.html" className="dropdown-item">Offcanvas</a>
                                                        <a href="ui-placeholders.html" className="dropdown-item">Placeholders</a>
                                                        <a href="ui-pagination.html" className="dropdown-item">Pagination</a>
                                                        <a href="ui-popovers.html" className="dropdown-item">Popovers</a>
                                                        <a href="ui-progress.html" className="dropdown-item">Progress</a>
                                                        <a href="ui-ribbons.html" className="dropdown-item">Ribbons</a>
                                                        <a href="ui-spinners.html" className="dropdown-item">Spinners</a>
                                                        <a href="ui-tabs.html" className="dropdown-item">Tabs</a>
                                                        <a href="ui-tooltips.html" className="dropdown-item">Tooltips</a>
                                                        <a href="ui-typography.html" className="dropdown-item">Typography</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-extended-ui" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Extended UI <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-extended-ui">
                                                        <a href="extended-dragula.html" className="dropdown-item">Dragula</a>
                                                        <a href="extended-range-slider.html" className="dropdown-item">Range Slider</a>
                                                        <a href="extended-ratings.html" className="dropdown-item">Ratings</a>
                                                        <a href="extended-scrollbar.html" className="dropdown-item">Scrollbar</a>
                                                        <a href="extended-scrollspy.html" className="dropdown-item">Scrollspy</a>
                                                        <a href="extended-treeview.html" className="dropdown-item">Treeview</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-charts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Charts <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-charts">
                                                        <div className="dropdown">
                                                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-apex-charts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Apex Charts <div className="arrow-down"></div>
                                                            </a>
                                                            <div className="dropdown-menu" aria-labelledby="topnav-apex-charts">
                                                                <a href="charts-apex-area.html" className="dropdown-item">Area</a>
                                                                <a href="charts-apex-bar.html" className="dropdown-item">Bar</a>
                                                                <a href="charts-apex-bubble.html" className="dropdown-item">Bubble</a>
                                                                <a href="charts-apex-candlestick.html" className="dropdown-item">Candlestick</a>
                                                                <a href="charts-apex-column.html" className="dropdown-item">Column</a>
                                                                <a href="charts-apex-heatmap.html" className="dropdown-item">Heatmap</a>
                                                                <a href="charts-apex-line.html" className="dropdown-item">Line</a>
                                                                <a href="charts-apex-mixed.html" className="dropdown-item">Mixed</a>
                                                                <a href="charts-apex-pie.html" className="dropdown-item">Pie</a>
                                                                <a href="charts-apex-radar.html" className="dropdown-item">Radar</a>
                                                                <a href="charts-apex-radialbar.html" className="dropdown-item">RadialBar</a>
                                                                <a href="charts-apex-scatter.html" className="dropdown-item">Scatter</a>
                                                                <a href="charts-apex-sparklines.html" className="dropdown-item">Sparklines</a>
                                                            </div>
                                                        </div>
                                                        <a href="charts-chartjs.html" className="dropdown-item">Chartjs</a>
                                                        <a href="charts-brite.html" className="dropdown-item">Britecharts</a>
                                                        <a href="charts-sparkline.html" className="dropdown-item">Sparklines</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-forms" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Forms <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-forms">
                                                        <a href="form-elements.html" className="dropdown-item">Basic Elements</a>
                                                        <a href="form-advanced.html" className="dropdown-item">Form Advanced</a>
                                                        <a href="form-validation.html" className="dropdown-item">Validation</a>
                                                        <a href="form-wizard.html" className="dropdown-item">Wizard</a>
                                                        <a href="form-fileuploads.html" className="dropdown-item">File Uploads</a>
                                                        <a href="form-editors.html" className="dropdown-item">Editors</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-tables" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Tables <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-tables">
                                                        <a href="tables-basic.html" className="dropdown-item">Basic Tables</a>
                                                        <a href="tables-datatable.html" className="dropdown-item">Data Tables</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-icons" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Icons <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-icons">
                                                        <a href="icons-dripicons.html" className="dropdown-item">Dripicons</a>
                                                        <a href="icons-mdi.html" className="dropdown-item">Material Design</a>
                                                        <a href="icons-unicons.html" className="dropdown-item">Unicons</a>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-maps" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Maps <div className="arrow-down"></div>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="topnav-maps">
                                                        <a href="maps-google.html" className="dropdown-item">Google Maps</a>
                                                        <a href="maps-vector.html" className="dropdown-item">Vector Maps</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-layouts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="uil-window me-1"></i>Layouts <div className="arrow-down"></div>
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="topnav-layouts">
                                                <a href="layouts-vertical.html" className="dropdown-item">Vertical</a>
                                                <a href="layouts-detached.html" className="dropdown-item">Detached</a>
                                                <a href="layouts-full.html" className="dropdown-item">Full</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div className ="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <form className="d-flex">
                                            <div className="input-group">
                                                <input type="text" className="form-control form-control-light" id="dash-daterange" />
                                                <span className="input-group-text bg-info border-info text-white">
                                                    <i className="mdi mdi-calendar-range font-13"></i>
                                                </span>
                                            </div>
                                            <a href="javascript: void(0);" className="btn btn-info ms-2">
                                                <i className="mdi mdi-autorenew"></i>
                                            </a>
                                        </form>
                                    </div>
                                    <h4 className="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-5 col-lg-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <i className="mdi mdi-account-multiple widget-icon bg-success-lighten text-success"></i>
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Customers</h5>
                                                <h3 className="mt-3 mb-3">36,254</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
                                                    <span className="text-nowrap">Since last month</span>  
                                                </p>
                                            </div> 
                                        </div>
                                    </div> 

                                    <div className="col-sm-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <i className="mdi mdi-cart-plus widget-icon bg-danger-lighten text-danger"></i>
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Orders</h5>
                                                <h3 className="mt-3 mb-3">5,543</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <i className="mdi mdi-currency-usd widget-icon bg-info-lighten text-info"></i>
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Revenue</h5>
                                                <h3 className="mt-3 mb-3">$6,254</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 7.00%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="col-sm-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <i className="mdi mdi-pulse widget-icon bg-warning-lighten text-warning"></i>
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Growth">Growth</h5>
                                                <h3 className="mt-3 mb-3">+ 30.56%</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 4.87%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 

                            <div className="col-xl-7 col-lg-6">
                                <div className="card card-h-100">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                            </div>
                                        </div>
                                        <h4 className="header-title mb-3">Projections Vs Actuals</h4>
                                            <div dir="ltr">
                                                <div id="high-performing-product" className="apex-charts" data-colors="#fa6767,#e3eaef"></div>
                                            </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div>

                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                            </div>
                                        </div>
                                        <h4 className="header-title mb-3">Revenue</h4>
                                        <div className="chart-content-bg">
                                            <div className="row text-center">
                                                <div className="col-sm-6">
                                                    <p className="text-muted mb-0 mt-3">Current Week</p>
                                                    <h2 className="fw-normal mb-3">
                                                        <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                                        <span>$58,254</span>
                                                    </h2>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="text-muted mb-0 mt-3">Previous Week</p>
                                                    <h2 className="fw-normal mb-3">
                                                        <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                                        <span>$69,524</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="dash-item-overlay d-none d-md-block" dir="ltr">
                                            <h5>Today's Earning: $2,562.30</h5>
                                            <p className="text-muted font-13 mb-3 mt-2">Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                                                Etiam rhoncus...</p>
                                            <a href="javascript: void(0);" className="btn btn-outline-primary">View Statements
                                                <i className="mdi mdi-arrow-right ms-2"></i>
                                            </a>
                                        </div>

                                        <div dir="ltr">
                                            <div id="revenue-chart" className="apex-charts mt-3" data-colors="#3688fc,#f9bc0d"></div>
                                        </div>
                            
                                    </div> 
                                </div> 
                            </div> 

                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                            </div>
                                        </div>
                                        <h4 className="header-title">Revenue By Location</h4>
                                        <div className="mb-4 mt-4">
                                            <div id="world-map-markers" style={{height: 224}}></div>
                                        </div>

                                        <h5 className="mb-1 mt-0 fw-normal">New York</h5>
                                        <div className="progress-w-percent">
                                            <span className = "progress-value fw-bold">72k </span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-dark" role="progressbar" style={{width:"72%"}}></div>
                                                {/* <div className="progress-bar bg-dark" role="progressbar" style={{width:"72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div> */}
                                            </div>
                                        </div>

                                        <h5 className="mb-1 mt-0 fw-normal">San Francisco</h5>
                                        <div className="progress-w-percent">
                                            <span className="progress-value fw-bold">39k </span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "39%"}}></div>
                                                {/* <div className="progress-bar bg-warning" role="progressbar" style={{width: "39%"}} aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div> */}
                                            </div>
                                        </div>

                                        <h5 className="mb-1 mt-0 fw-normal">Sydney</h5>
                                        <div className="progress-w-percent">
                                            <span className="progress-value fw-bold">25k </span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-info" role="progressbar" style={{width: "39%"}}></div>
                                                {/* <div className="progress-bar bg-info" role="progressbar" style={{width: 39}} aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div> */}
                                            </div>
                                        </div>

                                        <h5 className="mb-1 mt-0 fw-normal">Singapore</h5>
                                        <div className="progress-w-percent mb-0">
                                            <span className="progress-value fw-bold">61k </span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: "61%"}}></div>
                                                {/* <div className="progress-bar bg-success" role="progressbar" style={{width: "61%"}} aria-valuenow="61" aria-valuemin="0" aria-valuemax="100"></div> */}
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div> 
                        </div>

                        <div className="row">
                            <div className="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="" className="btn btn-sm btn-link float-end">Export
                                            <i className="mdi mdi-download ms-1"></i>
                                        </a>
                                        <h4 className="header-title mt-2 mb-3">Top Selling Products</h4>

                                        <div className="table-responsive">
                                            <table className="table table-centered table-nowrap table-hover mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">ASOS Ridley High Waist</h5>
                                                            <span className="text-muted font-13">07 April 2018</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$79.49</h5>
                                                            <span className="text-muted font-13">Price</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">82</h5>
                                                            <span className="text-muted font-13">Quantity</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$6,518.18</h5>
                                                            <span className="text-muted font-13">Amount</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">Marco Lightweight Shirt</h5>
                                                            <span className="text-muted font-13">25 March 2018</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$128.50</h5>
                                                            <span className="text-muted font-13">Price</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">37</h5>
                                                            <span className="text-muted font-13">Quantity</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$4,754.50</h5>
                                                            <span className="text-muted font-13">Amount</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">Half Sleeve Shirt</h5>
                                                            <span className="text-muted font-13">17 March 2018</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$39.99</h5>
                                                            <span className="text-muted font-13">Price</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">64</h5>
                                                            <span className="text-muted font-13">Quantity</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$2,559.36</h5>
                                                            <span className="text-muted font-13">Amount</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">Lightweight Jacket</h5>
                                                            <span className="text-muted font-13">12 March 2018</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$20.00</h5>
                                                            <span className="text-muted font-13">Price</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">184</h5>
                                                            <span className="text-muted font-13">Quantity</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$3,680.00</h5>
                                                            <span className="text-muted font-13">Amount</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">Marco Shoes</h5>
                                                            <span className="text-muted font-13">05 March 2018</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$28.49</h5>
                                                            <span className="text-muted font-13">Price</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">69</h5>
                                                            <span className="text-muted font-13">Quantity</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-14 my-1 fw-normal">$1,965.81</h5>
                                                            <span className="text-muted font-13">Amount</span>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 

                            <div className="col-xl-3 col-lg-6 order-lg-1">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                            </div>
                                        </div>
                                        <h4 className="header-title">Total Sales</h4>
                                        <div id="average-sales" className="apex-charts mb-4 mt-4"data-colors="#3688fc,#6c757d,#42d29d,#fa6767"></div>
                                            <div className="chart-widget-list">
                                                <p>
                                                    <i className="mdi mdi-square text-primary"></i> Direct
                                                    <span className="float-end">$300.56</span>
                                                </p>
                                                <p>
                                                    <i className="mdi mdi-square text-dark"></i> Affilliate
                                                    <span className="float-end">$135.18</span>
                                                </p>
                                                <p>
                                                    <i className="mdi mdi-square text-success"></i> Sponsored
                                                    <span className="float-end">$48.96</span>
                                                </p>
                                                <p className="mb-0">
                                                    <i className="mdi mdi-square text-danger"></i> E-mail
                                                    <span className="float-end">$154.02</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>

                                <div className="col-xl-3 col-lg-6 order-lg-1">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dropdown float-end">
                                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                    <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                    <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                    <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                                </div>
                                            </div>
                                            <h4 className="header-title mb-2">Recent Activity</h4>
                                            <div data-simplebar style={{maxHeight: 419}}> 
                                            <div className="timeline-alt pb-0">
                                                <div className="timeline-item">
                                                    <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-info fw-bold mb-1 d-block">You sold an item</a>
                                                        <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">5 minutes ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-primary fw-bold mb-1 d-block">Product on the Bootstrap Market</a>
                                                        <small>Dave Gamache added
                                                            <span className="fw-bold">Admin Dashboard</span>
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">30 minutes ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-info fw-bold mb-1 d-block">Robert Delaney</a>
                                                        <small>Send you message
                                                            <span className="fw-bold">"Are you there?"</span>
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">2 hours ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-upload bg-primary-lighten text-primary timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-primary fw-bold mb-1 d-block">Audrey Tobey</a>
                                                        <small>Uploaded a photo
                                                            <span className="fw-bold">"Error.jpg"</span>
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">14 hours ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-info fw-bold mb-1 d-block">You sold an item</a>
                                                        <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">16 hours ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-primary fw-bold mb-1 d-block">Product on the Bootstrap Market</a>
                                                        <small>Dave Gamache added
                                                            <span className="fw-bold">Admin Dashboard</span>
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">22 hours ago</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="timeline-item">
                                                    <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className="text-info fw-bold mb-1 d-block">Robert Delaney</a>
                                                        <small>Send you message
                                                            <span className="fw-bold">"Are you there?"</span>
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">2 days ago</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <script>document.write(new Date().getFullYear())</script> © Hyper - Coderthemes.com
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-end footer-links d-none d-md-block">
                                    <a href="javascript: void(0);">About</a>
                                    <a href="javascript: void(0);">Support</a>
                                    <a href="javascript: void(0);">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <div className="end-bar">
            <div className="rightbar-title">
                <a href="javascript:void(0);" className="end-bar-toggle float-end">
                    <i className="dripicons-cross noti-icon"></i>
                </a>
                <h5 className="m-0">Settings</h5>
            </div>

            <div className="rightbar-content h-100" data-simplebar>

            <div className="p-3">
                <div className="alert alert-warning" role="alert">
                    <strong>Customize </strong> the overall color scheme, layout width, etc.
                </div>
                <h5 className="mt-3">Color Scheme</h5>
                <hr className="mt-1" />

                <div className="form-check form-switch mb-1">
                    <input type="checkbox" className="form-check-input" name="color-scheme-mode" value="light"
                        id="light-mode-check" checked />
                    <label className="form-check-label" for="light-mode-check">Light Mode</label>
                </div>

                <div className="form-check form-switch mb-1">
                    <input type="checkbox" className="form-check-input" name="color-scheme-mode" value="dark"
                        id="dark-mode-check" />
                    <label className="form-check-label" for="dark-mode-check">Dark Mode</label>
                </div>

                <h5 className="mt-4">Width</h5>
                <hr className="mt-1" />
                <div className="form-check form-switch mb-1">
                    <input type="checkbox" className="form-check-input" name="width" value="fluid" id="fluid-check" checked />
                    <label className="form-check-label" for = "fluid-check">Fluid</label>
                </div>
                <div className="form-check form-switch mb-1">
                    <input type="checkbox" className="form-check-input" name="width" value="boxed" id="boxed-check" />
                    <label className="form-check-label" for="boxed-check">Boxed</label>
                </div>


                <div className="d-grid mt-4">
                    <button className="btn btn-primary" id="resetBtn">Reset to Default</button>

                    <a href="https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/"
                        className="btn btn-danger mt-3" target="_blank"><i className="mdi mdi-basket me-1"></i> Purchase Now</a>
                </div>
            </div>
        </div>
        </div>
    </div>
)
    }
}





        
   
           