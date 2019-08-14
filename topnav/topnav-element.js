import { LitElement, html, css } from 'lit-element'

// Extend the LitElement base class
class TopnavElement extends LitElement {

  render() {
    return html`
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <nav class="navbar navbar-inverse navbar-static-top" role="navigation">
      <div id="nav-tophat-helper" class="hidden-xs"></div>

      <ul class="nav navbar-nav navbar-main">

          <!--Hamburger on left-->
          <li class="nav-hamburger dropdown dropdown-ia pull-left hidden-sm hidden-md hidden-lg">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-hamburger-menu" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <div class="navbar-collapse collapse" id="nav-hamburger-menu" aria-expanded="false">
                  <ul id="" class="nav navbar-nav">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 4</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a class="navbar-brand" href="https://archive.org/" data-event-click-tracking="TopNav|HomeIcon" target="_top">
              <img src="/assets/img/ia-logo.svg" class="iconochive-logo">
            </a>
          </li>

          <li>
            <a class="pull-right" href="#" data-handler="dropdown">
              <img src="/assets/img/ia-user.svg" class="iconochive-user">
            </a>
          </li>

          <li>
            <a class="pull-right" href="https://archive.org/search.php" onclick="$(this).parents('#nav-search').find('form').submit(); return false" aria-hidden="true">
              <img src="/assets/img/ia-search.svg" class="iconochive-search">
            </a>
          </li>

        </ul>
      </div>
    </nav>
   `;
  }

  static get styles() {
    return css`
      body {
        margin: 0px;
      }

      #nav-tophat-helper {
        position:absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
      }

      .navbar-nav {
        margin: 0px;
      }

      .navbar-brand {
        left: 40%;
        position: relative;
        transform: translateX(-50%);
      }

    `;
  }
}

customElements.define('topnav-element', TopnavElement);
