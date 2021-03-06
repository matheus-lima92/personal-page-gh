/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import languages from './languages';
import { getLanguage, switchLanguage } from './languagesMenuActions';
import { CurrentLanguage, LanguagesOptions } from './languagesMenuStyles';


class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = { currentLanguage: '', translations: '', displayLanguages: false };
    this.languagesMenu = React.createRef();
    this.changeLanguage = this.changeLanguage.bind(this);
    this.showLanguages = this.showLanguages.bind(this);
  }

  componentWillMount() {
    this.props.getLanguage();
  }

  componentDidMount() {
    TweenMax.set(this.languagesMenu, { opacity: 0 });
    TweenMax.to(this.languagesMenu, 0.2, {
      opacity: 1,
      delay: 3.5,
    });
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.language !== oldProps.language) {
      this.setState({
        ...this.state,
        currentLanguage: newProps.language,
        translations: languages[newProps.language],
        displayLanguages: false,
      });
    }
  }

  changeLanguage(language) {
    const currentLanguage = this.props.language;
    if (currentLanguage === language) {
      this.setState({ ...this.state, displayLanguages: false });
      return;
    }
    // this.setState({ ...this.state, currentLanguage: language });
    this.props.switchLanguage(language);
  }

  showLanguages() {
    const newDisplayLanguagesState = !this.state.displayLanguages;
    this.setState({ ...this.state, displayLanguages: newDisplayLanguagesState });
  }

  render() {
    const { displayLanguages, currentLanguage } = this.state;
    return (
      <div ref={(elem) => { this.languagesMenu = elem; }}>
        <CurrentLanguage onClick={() => this.showLanguages()}>
          <img
            alt="Country's Language Flag"
            src={currentLanguage === 'pt' ?
              'https://svgur.com/i/9Bw.svg' :
              'https://svgur.com/i/9B5.svg'
            }
          />
          <i className="fa fa-chevron-down" aria-hidden="true" />
          {displayLanguages &&
            <LanguagesOptions>
              { /* eslint-disable */}
              <div onClick={() => this.changeLanguage('pt')}>
                { /* eslint-enable */}
                <img
                  alt="Brazil Flag"
                  src="https://svgur.com/i/9Bw.svg"
                />
                <span>Português (BR)</span>
              </div>
              { /* eslint-disable */}
              <div onClick={() => this.changeLanguage('en')}>
                { /* eslint-enable */}
                <img
                  alt="USA Flag"
                  src="https://svgur.com/i/9B5.svg"
                />
                <span>English (US)</span>
              </div>
            </LanguagesOptions>
          }
        </CurrentLanguage>
      </div>
    );
  }
}

/* --- props validation --- */
Languages.propTypes = {
  getLanguage: PropTypes.func,
  switchLanguage: PropTypes.func,
  language: PropTypes.string,
};
Languages.defaultProps = {
  getLanguage: null,
  switchLanguage: null,
  language: 'pt',
};
/* --- end of props validation --- */


const mapStateToProps = state => ({ language: state.language.currentLanguage });
const mapDispatchToProps = dispatch => bindActionCreators({
  getLanguage,
  switchLanguage,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Languages);
