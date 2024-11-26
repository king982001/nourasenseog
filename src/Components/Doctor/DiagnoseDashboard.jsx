import EmptyHead from '../components/EmptyHead';
import DiagnoseIntro from '../diagnosecomponents/DiagnoseIntro';
import Demographic from '../diagnosecomponents/Demographic';
import GrowthChart from '../diagnosecomponents/GrowthChart';
import Footer from '../components/Footer';
import CalenderTableComp from '../diagnosecomponents/CalenderTableComp';
import styles from './DiagnoseDashboard.module.css';
import {useParams} from "react-router-dom";

const DiagnoseDashboard = () => {
  return (
    <div className="diagnose-dashboard">
      <EmptyHead />
      <div className="diagnose-content">
        <DiagnoseIntro />
        {/* <Demographic /> */}
        {/* <GrowthChart /> */}
         <CalenderTableComp />
      </div>
      <Footer />
    </div>
  );
};

export default DiagnoseDashboard;
