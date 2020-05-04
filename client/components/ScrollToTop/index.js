import React from 'react';
import styles from './style.module.scss';

class ScrollingWrapper extends React.Component {
  state = { hasScrolled: false };

  componentDidMount() {
    this.scrollingWrapper.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (this.scrollingWrapper.scrollTop > 100 && !this.state.hasScrolled) {
      this.setState({ hasScrolled: true });
    } else if (this.scrollingWrapper.scrollTop < 100 && this.state.hasScrolled) {
      this.setState({ hasScrolled: false });
    }
  };

  scrollToTop = () => {
    this.scrollingWrapper.scrollTop = 0;
  };

  reference = id => ref => {
    this[id] = ref;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.hasScrolled && (
          <span className={styles.scrollTop} onClick={this.scrollToTop}>
            <span className={styles.scrollTopIcon}></span>
          </span>
        )}
        <div className={styles.scrollingWrapperContainer} ref={this.reference('scrollingWrapper')}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default ScrollingWrapper;
