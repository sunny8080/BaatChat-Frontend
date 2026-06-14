import './FileList.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';

const FileList = () => {
  return (
    <div className="bc-FileList">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <div className="bc-panel-mobile-logo">
            <img src={bcLogo} alt="BaatChat" />
          </div>
          <h3 className="bc-panel-title">Files</h3>
        </div>
      </div>
    </div>
  );
};

export default FileList;
