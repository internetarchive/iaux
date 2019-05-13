import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { calculateDimensions, getPageToShow } from './utils/dom-dimensions';

/**
 * Pagination component takes a list of pre-drawn children
 * and displays them as columns using flexbox.
 *
 * On load, We wait for flexbox CSS to apply to the tracklist.
 * Then, we check to see if it creates columns.
 * If so, then we calculate the number of pages that it creates & makes the pagination buttons.
 *
 * Behavior:
 * On client mount,
 *   - find dimensions of paginator window. Running calibration twice to ensure browser
 *     has loaded flexbox column-wrap
 * On window resize & props change,
 *   - find updated dimensions of paginator window
 *
 * @params - see Props
 * @return component
 */
class Paginator extends Component {
  constructor(props) {
    super(props);

    this.Paginator = React.createRef();

    this.state = {
      pageSelected: 1,
      numberOfColumns: '',
      numberOfPages: 0,
      scrollThresholds: null,
    };

    this.renderPageButtons = this.renderPageButtons.bind(this);
    this.clickPageButton = this.clickPageButton.bind(this);
    this.calibrateDimensions = this.calibrateDimensions.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.setItemInView = this.setItemInView.bind(this);
    this.recalibrate = this.recalibrate.bind(this);
  }

  componentDidMount() {
    // set resize event listener
    const debounceCalibration = debounce(this.recalibrate, 370);
    window.addEventListener('resize', debounceCalibration);

    return this.calibrateDimensions(() => {
      // waiting for styles to load
      // petabox css is extremely heavy, takes a smidge of time to deliver
      setTimeout(this.calibrateDimensions, 700);
    });
  }

  componentDidUpdate(prevProps) {
    const { itemInViewClass: prevItemInViewClass, children: prevChildren } = prevProps;
    const { itemInViewClass, children } = this.props;
    const newItemInView = prevItemInViewClass !== itemInViewClass;
    const childrenChange = prevChildren.length !== children.length;
    if (newItemInView || childrenChange) {
      this.recalibrate(true);
    }
  }

  componentWillUnmount() {
    // remove resize event listener
    const debounceCalibration = debounce(this.recalibrate, 370);
    window.removeEventListener('resize', debounceCalibration);
  }

  /**
   * Finds item that is selected and makes sure it is in paginator's view window
   *
   * If item is off page, then scroll item to view & save the page in view in state
   */
  setItemInView() {
    const { scrollThresholds } = this.state;
    const { itemInViewClass } = this.props;
    const viewport = this.Paginator.current;
    const item = document.querySelector(itemInViewClass) || viewport.firstElementChild;

    const pages = Object.keys(scrollThresholds);
    let thisPage = null;
    let thisRange = null;

    // find range it is in,
    pages.forEach((page) => {
      const { low, high } = scrollThresholds[page];
      const numberToFind = item.offsetWidth + item.offsetLeft;
      const isInRange = (numberToFind >= low) && (numberToFind <= high);
      if (isInRange) {
        thisPage = parseInt(page, 10) || 1;
        thisRange = scrollThresholds[page];
      }
    });

    if (thisPage && thisRange) {
      viewport.scrollTo({
        top: 0,
        left: thisRange.low,
        behavior: 'smooth'
      });

      this.setState({ pageSelected: thisPage });
    }
  }

  /**
   * Recalibrate dimensions of pagininator, taking into account what the closest page is
   *
   * @param { boolean } newItemInView - optional toggle
   */
  recalibrate(scrollItemIntoView = false) {
    const findClosestThreshold = () => {
      const { scrollThresholds, pageSelected: currentPage } = this.state;
      const { itemInViewClass } = this.props;
      const viewport = this.Paginator.current;

      // we only want pagination recalibration when it is single column
      // and when it has more than 1 page
      const numberOfPages = Object.keys(scrollThresholds);
      const isColumn = viewport.className === 'flexbox-pagination column';
      if (!isColumn && (numberOfPages.length <= 1)) return;

      let itemToView = null;
      if (scrollItemIntoView) {
        // focus on item but keep page position
        itemToView = viewport.querySelector(itemInViewClass);
        if (itemToView) {
          const currentX = window.pageXOffset;
          const currentY = window.pageYOffset;
          itemToView.focus();
          window.scrollTo(currentX, currentY);
        }
      }
      const viewportFlush = scrollItemIntoView
        ? (itemToView.clientWidth + itemToView.offsetLeft)
        : viewport.scrollLeft;
      const pageToShow = getPageToShow({ currentPage, viewportFlush, scrollThresholds });
      const leftFlush = scrollThresholds[pageToShow];
      viewport.scrollTo({
        top: 0,
        left: (leftFlush && leftFlush.low) || 0,
        behavior: 'smooth'
      });
      const pageSelected = parseInt(pageToShow, 10);
      const numPages = numberOfPages.length;
      this.setState({ pageSelected, numberOfPages: numPages });
    };

    return this.calibrateDimensions(() => {
      // waiting for styles to load
      // petabox css is extremely heavy, takes a smidge of time to deliver
      setTimeout(this.calibrateDimensions(findClosestThreshold), 700);
    });
  }

  /**
   * This is where we:
   * - check how many columns flexbox has created
   * - find how many 'pages' there are from column count
   * - find scroll thresholds for each page
   *
   * @param { function } setStateCallback - optional function to run after state gets updated
   */
  calibrateDimensions(setStateCallback = this.setItemInView) {
    if (this.Paginator.current) {
      const {
        numberOfColumns, numberOfPages, scrollThresholds
      } = calculateDimensions(this.Paginator.current);

      const newState = {
        numberOfColumns,
        numberOfPages,
        scrollThresholds,
      };

      this.setState(newState, setStateCallback);
    }
  }

  /* CLICK HANDLERS */

  /**
   * Behavior of page button clicks
   * Side effect: Direct DOM scroll
   *
   * @param { object } event - React Synthetic Event
   */
  clickPageButton(event) {
    const { scrollThresholds } = this.state;
    const pageSelected = parseInt(event.target.getAttribute('data-page-number'), 10);
    const { low: leftAlignThreshold } = scrollThresholds[pageSelected];

    setTimeout(() => {
      this.Paginator.current.scrollTo({
        top: 0,
        left: leftAlignThreshold,
        behavior: 'smooth'
      });
    }, 200);

    this.setState({ pageSelected });
  }

  /**
   * Behavior of next button clicks
   * Side effect: Direct DOM scroll
   *
   * @param { object } event - React Synthetic Event
   */
  goToNextPage(event) {
    const { pageSelected, scrollThresholds } = this.state;
    const nextPage = pageSelected + 1;
    const nextPageThreshold = scrollThresholds[nextPage];

    this.Paginator.current.scrollTo({
      top: 0,
      left: nextPageThreshold.low,
      behavior: 'smooth'
    });

    this.setState({ pageSelected: nextPage });
  }

  /**
   * Behavior of previous button clicks
   * Side effect: UI scroll
   *
   * @param { object } event - React Synthetic Event
   */
  goToPreviousPage(event) {
    const { pageSelected, scrollThresholds } = this.state;
    const prevPage = pageSelected - 1 || 1;
    const prevPageThreshold = scrollThresholds[prevPage];

    this.Paginator.current.scrollTo({
      top: 0,
      left: prevPageThreshold.low,
      behavior: 'smooth',
    });

    this.setState({ pageSelected: prevPage });
  }

  /* END EVENT HANDLERS */

  renderRightButton() {
    const { pageSelected, numberOfPages } = this.state;
    const { dataEventCategory } = this.props;

    if (numberOfPages === pageSelected) return null;

    return (
      <button
        type="button"
        className="pagination-arrow right"
        onClick={this.goToNextPage}
        data-event-click-tracking={`${dataEventCategory}|Paginator-Arrow-Right`}
        tabIndex="-1"
      >
        <span className="sr-only">next page</span>
      </button>
    );
  }

  renderLeftButton() {
    const { pageSelected } = this.state;
    const { dataEventCategory } = this.props;

    if (pageSelected === 1) return null;

    return (
      <button
        type="button"
        className="pagination-arrow left"
        onClick={this.goToPreviousPage}
        data-event-click-tracking={`${dataEventCategory}|Paginator-Arrow-left`}
        tabIndex="-1"
      >
        <span className="sr-only">previous page</span>
      </button>
    );
  }

  renderPageButtons() {
    const { numberOfPages, scrollThresholds, pageSelected } = this.state;
    const { dataEventCategory } = this.props;
    if (!numberOfPages || numberOfPages < 2) return null;

    const pageNumbers = Object.keys(scrollThresholds);
    const drawButtons = numberOfPages === pageNumbers.length;

    if (drawButtons) {
      const pageButtons = pageNumbers.map((thisPage, i) => {
        const isPage = parseInt(thisPage, 10) === pageSelected;
        return (
          <button
            type="button"
            key={`pagination_button_${i}`}
            onClick={this.clickPageButton}
            data-page-number={thisPage}
            className={`pagination-button ${isPage ? 'selected' : ''}`}
            data-event-click-tracking={`${dataEventCategory}|Paginator-Button`}
            tabIndex="-1"
          >
            <span className="sr-only">{thisPage}</span>
          </button>
        );
      });

      return <div className="page-buttons">{ pageButtons }</div>;
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { numberOfColumns } = this.state;
    return (
      <Fragment>
        <div
          ref={this.Paginator}
          className="flexbox-pagination column"
        >
          { children }
        </div>
        { this.renderLeftButton() }
        { this.renderRightButton() }
        { this.renderPageButtons() }
      </Fragment>
    );
  }
}

Paginator.defaultProps = {
  children: null,
  itemInViewClass: '',
};

Paginator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object, // React object
    PropTypes.arrayOf(PropTypes.object) // More than one React objects
  ]),
  itemInViewClass: PropTypes.string,
  dataEventCategory: PropTypes.string.isRequired,
};

export default Paginator;
