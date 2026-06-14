import './CallList.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';

const CallList = () => {
  return (
    <div className="bc-CallList">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <div className="bc-panel-mobile-logo">
            <img src={bcLogo} alt="BaatChat" />
          </div>
          <h3 className="bc-panel-title">Calls</h3>
        </div>
      </div>
    </div>
  );
};

export default CallList;
