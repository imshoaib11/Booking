import React,{useState, CSSProperties} from 'react'
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    
  return <>
            <div>
        <div className="sweet-loading text-center" style={{marginTop:'150px'}}>
        <BeatLoader
        color= '#36d7b7'
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>

  </>
}

export default Loader