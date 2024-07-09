import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { collection, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import './FuelKiloForm.css';
import { useNavigate } from 'react-router-dom';

const names = [
    { value: '2 Boys 2 Girls (PTY) LTD', label: '2 Boys 2 Girls (PTY) LTD' },
    { value: 'Abby Mojalefa Enterprise (PTY) LTD', label: 'Abby Mojalefa Enterprise (PTY) LTD' },
    { value: 'Ahiterene Maxaka Enterprise (PTY) LTD', label: 'Ahiterene Maxaka Enterprise (PTY) LTD' },
    { value: 'All4U Enterprise (PTY) LTD', label: 'All4U Enterprise (PTY) LTD' },
    { value: 'Atlegang Le Amogelane Enterprise (PTY) LTD', label: 'Atlegang Le Amogelane Enterprise (PTY) LTD' },
    { value: 'Bokamose Enterprise (PTY) LTD', label: 'Bokamose Enterprise (PTY) LTD' },
    { value: 'Bokang and Brothers Enterprise (PTY) LTD', label: 'Bokang and Brothers Enterprise (PTY) LTD' },
    { value: 'Boya Emmanuel Enterprise (PTY) LTD', label: 'Boya Emmanuel Enterprise (PTY) LTD' },
    { value: 'Clement Enterprise (PTY) LTD', label: 'Clement Enterprise (PTY) LTD' },
    { value: 'Elephant Gunners (PTY) LTD', label: 'Elephant Gunners (PTY) LTD' },
    { value: 'FTM Logistics (PTY) LTD', label: 'FTM Logistics (PTY) LTD' },
    { value: 'Global Horizon Petroleum (PTY) LTD', label: 'Global Horizon Petroleum (PTY) LTD' },
    { value: 'Hlelo M Enterprise (PTY) LTD', label: 'Hlelo M Enterprise (PTY) LTD' },
    { value: 'Hlongz Enterprise (PTY) LTD', label: 'Hlongz Enterprise (PTY) LTD' },
    { value: 'Itereleng Projects (PTY) LTD', label: 'Itereleng Projects (PTY) LTD' },
    { value: 'J Fophs Enterprise (PTY) LTD', label: 'J Fophs Enterprise (PTY) LTD' },
    { value: 'Jacob and Son Projection (PTY) LTD', label: 'Jacob and Son Projection (PTY) LTD' },
    { value: 'Joseph Sibusiso Mokome\'s Enterprise (PTY) LTD', label: 'Joseph Sibusiso Mokome\'s Enterprise (PTY) LTD' },
    { value: 'KA Mtsweni Enterprise (PTY) LTD', label: 'KA Mtsweni Enterprise (PTY) LTD' },
    { value: 'Kamohelo Tshimoloho Enterprise (PTY) LTD', label: 'Kamohelo Tshimoloho Enterprise (PTY) LTD' },
    { value: 'Khulekani Habile Enterprise (PTY) LTD', label: 'Khulekani Habile Enterprise (PTY) LTD' },
    { value: 'KMoss Distributers (PTY) LTD', label: 'KMoss Distributers (PTY) LTD' },
    { value: 'KnK Investments and Projects (PTY) LTD', label: 'KnK Investments and Projects (PTY) LTD' },
    { value: 'Letuma Kgole Enterprise (PTY) LTD', label: 'Letuma Kgole Enterprise (PTY) LTD' },
    { value: 'Ludwick and Sons Enterprise (PTY) LTD', label: 'Ludwick and Sons Enterprise (PTY) LTD' },
    { value: 'Magalela Freight (PTY) LTD', label: 'Magalela Freight (PTY) LTD' },
    { value: 'Magomane Distributors (PTY) LTD', label: 'Magomane Distributors (PTY) LTD' },
    { value: 'Makgatholela Sons (PTY) LTD', label: 'Makgatholela Sons (PTY) LTD' },
    { value: 'Malope Bokaba Enterprise (PTY) LTD', label: 'Malope Bokaba Enterprise (PTY) LTD' },
    { value: 'Malpha E Logistics (PTY) LTD', label: 'Malpha E Logistics (PTY) LTD' },
    { value: 'Mamps Enterprise (PTY) LTD', label: 'Mamps Enterprise (PTY) LTD' },
    { value: 'Matladi Empire (PTY) LTD', label: 'Matladi Empire (PTY) LTD' },
    { value: 'Mbhodli Enterprise (PTY) LTD', label: 'Mbhodli Enterprise (PTY) LTD' },
    { value: 'Mdhluli Empire (PTY) LTD', label: 'Mdhluli Empire (PTY) LTD' },
    { value: 'Mickey Herb Enterprise (PTY) LTD', label: 'Mickey Herb Enterprise (PTY) LTD' },
    { value: 'MK Rams Distributors (PTY) LTD', label: 'MK Rams Distributors (PTY) LTD' },
    { value: 'Mocks Enterprise (PTY) LTD', label: 'Mocks Enterprise (PTY) LTD' },
    { value: 'Moholane Distributors (PTY) LTD', label: 'Moholane Distributors (PTY) LTD' },
    { value: 'Mokerong Enterprise (PTY) LTD', label: 'Mokerong Enterprise (PTY) LTD' },
    { value: 'Montwedi Enterprise (PTY) LTD', label: 'Montwedi Enterprise (PTY) LTD' },
    { value: 'Mpete Sons Enterprise (PTY) LTD', label: 'Mpete Sons Enterprise (PTY) LTD' },
    { value: 'Ndanduleni and Sons (PTY) LTD', label: 'Ndanduleni and Sons (PTY) LTD' },
    { value: 'Neothati Enterprises (PTY) LTD', label: 'Neothati Enterprises (PTY) LTD' },
    { value: 'NgwenyaJm and Sons (PTY) LTD', label: 'NgwenyaJm and Sons (PTY) LTD' },
    { value: 'Nhlamulo Logistic (PTY) LTD', label: 'Nhlamulo Logistic (PTY) LTD' },
    { value: 'Osman Shadrack Projects (PTY) LTD', label: 'Osman Shadrack Projects (PTY) LTD' },
    { value: 'Papa T Enterprise (PTY) LTD', label: 'Papa T Enterprise (PTY) LTD' },
    { value: 'Papas Distributors (PTY) LTD', label: 'Papas Distributors (PTY) LTD' },
    { value: 'Robby Enterprise (PTY) LTD', label: 'Robby Enterprise (PTY) LTD' },
    { value: 'S Nkhumise Distributers (PTY) LTD', label: 'S Nkhumise Distributers (PTY) LTD' },
    { value: 'Sefata and Sons (PTY) LTD', label: 'Sefata and Sons (PTY) LTD' },
    { value: 'Seitei Holding Group (PTY) LTD', label: 'Seitei Holding Group (PTY) LTD' },
    { value: 'SJBL Enterprise (PTY) LTD', label: 'SJBL Enterprise (PTY) LTD' },
    { value: 'TBJ Ndlovu Enterprise (PTY) LTD', label: 'TBJ Ndlovu Enterprise (PTY) LTD' },
    { value: 'Uncle Dan Enterprise (PTY) LTD', label: 'Uncle Dan Enterprise (PTY) LTD' },
    { value: 'VO Betrams (PTY) LTD', label: 'VO Betrams (PTY) LTD' },
    { value: 'Zaka Zaka Enterprise (PTY) LTD', label: 'Zaka Zaka Enterprise (PTY) LTD' }
  ];

  const vehicleRegistrations = [
    { value: 'DZ11GTGP', label: 'DZ11GTGP' },
    { value: 'FF99CGGP', label: 'FF99CGGP' },
    { value: 'DZ11FMGP', label: 'DZ11FMGP' },
    { value: 'DF64PNGP', label: 'DF64PNGP' },
    { value: 'DJ78XRGP', label: 'DJ78XRGP' },
    { value: 'DY10XKGP', label: 'DY10XKGP' },
    { value: 'DY10XHGP', label: 'DY10XHGP' },
    { value: 'DG42XPGP', label: 'DG42XPGP' },
    { value: 'DG92LGGP', label: 'DG92LGGP' },
    { value: 'FB86CGGP', label: 'FB86CGGP' },
    { value: 'DZ75CWGP', label: 'DZ75CWGP' },
    { value: 'DX96FVGP', label: 'DX96FVGP' },
    { value: 'DY10WZGP', label: 'DY10WZGP' },
    { value: 'DC97VLGP', label: 'DC97VLGP' },
    { value: 'DG19YPGP', label: 'DG19YPGP' },
    { value: 'DC66VJGP', label: 'DC66VJGP' },
    { value: 'DY90LMGP', label: 'DY90LMGP' },
    { value: 'HP42KSGP', label: 'HP42KSGP' },
    { value: 'FB66VDGP', label: 'FB66VDGP' },
    { value: 'DM00MHGP', label: 'DM00MHGP' },
    { value: 'FF72BNGP', label: 'FF72BNGP' },
    { value: 'DM30YPGP', label: 'DM30YPGP' },
    { value: 'DX96JKGP', label: 'DX96JKGP' },
    { value: 'DY90GVGP', label: 'DY90GVGP' },
    { value: 'DF96VFGP', label: 'DF96VFGP' },
    { value: 'HH62MVGP', label: 'HH62MVGP' },
    { value: 'HN83ZJGP', label: 'HN83ZJGP' },
    { value: 'DJ64GXGP', label: 'DJ64GXGP' },
    { value: 'DC80BFGP', label: 'DC80BFGP' },
    { value: 'DK02TYGP', label: 'DK02TYGP' },
    { value: 'DZ89XDGP', label: 'DZ89XDGP' },
    { value: 'DM00MKGP', label: 'DM00MKGP' },
    { value: 'DG19ZDGP', label: 'DG19ZDGP' },
    { value: 'DG75MJGP', label: 'DG75MJGP' },
    { value: 'DC66WFGP', label: 'DC66WFGP' },
    { value: 'DM30YSGP', label: 'DM30YSGP' },
    { value: 'HN83ZBGP', label: 'HN83ZBGP' },
    { value: 'DF96VMGP', label: 'DF96VMGP' },
    { value: 'DD65MFGP', label: 'DD65MFGP' },
    { value: 'DD89KPGP', label: 'DD89KPGP' },
    { value: 'HT47ZWGP', label: 'HT47ZWGP' },
    { value: 'DC80BNGP', label: 'DC80BNGP' },
    { value: 'DD65MGGP', label: 'DD65MGGP' },
    { value: 'DC97VMGP', label: 'DC97VMGP' },
    { value: 'DG60LYGP', label: 'DG60LYGP' },
    { value: 'FH17WVGP', label: 'FH17WVGP' },
    { value: 'DC80BRGP', label: 'DC80BRGP' },
    { value: 'DG19ZHGP', label: 'DG19ZHGP' },
    { value: 'DZ01RRGP', label: 'DZ01RRGP' },
    { value: 'DJ64GZGP', label: 'DJ64GZGP' },
    { value: 'DL05FHGP', label: 'DL05FHGP' },
    { value: 'DZ89VJGP', label: 'DZ89VJGP' },
    { value: 'HN03CRGP', label: 'HN03CRGP' },
    { value: 'FH17WBGP', label: 'FH17WBGP' },
    { value: 'DD89KKGP', label: 'DD89KKGP' },
    { value: 'DC80BGGP', label: 'DC80BGGP' },
    { value: 'DY28BFGP', label: 'DY28BFGP' },
    { value: 'DG75MCGP', label: 'DG75MCGP' },
    { value: 'DG75MFGP', label: 'DG75MFGP' },
    { value: 'FF99CZGP', label: 'FF99CZGP' },
    { value: 'DG92LXGP', label: 'DG92LXGP' },
    { value: 'DG42XTGP', label: 'DG42XTGP' },
    { value: 'DM00LMGP', label: 'DM00LMGP' },
    { value: 'DG42XMGP', label: 'DG42XMGP' },
    { value: 'DG92LVGP', label: 'DG92LVGP' },
    { value: 'DZ92NSGP', label: 'DZ92NSGP' },
    { value: 'LT17TRGP', label: 'LT17TRGP' },
    { value: 'LT17TWGP', label: 'LT17TWGP' },
    { value: 'LT17VCGP', label: 'LT17VCGP' },
    { value: 'LT17TXGP', label: 'LT17TXGP' },
    { value: 'LT17VDGP', label: 'LT17VDGP' },
    { value: 'LT17TNGP', label: 'LT17TNGP' },
    { value: 'LT17THGP', label: 'LT17THGP' },
    // Premier Vehicles below
    { value: 'BS14LZGP', label: 'BS14LZGP'},
    { value: 'BR94CCGP', label: 'BR94CCGP'},
    { value: 'CZ98WYGP', label: 'CZ98WYGP'},
    { value: 'DC59JJGP', label: 'DC59JJGP'},
    { value: 'DG75LLGP', label: 'DG75LLGP'},
    { value: 'DH23YZGP', label: 'DH23YZGP'},
    { value: 'DM00MBGP', label: 'DM00MBGP'},
    { value: 'DX96DRGP', label: 'DX96DRGP'},
    { value: 'KY51GJGP', label: 'KY51GJGP'},
    { value: 'KZ50GYGP', label: 'KZ50GYGP'},
    { value: 'BS14LZGP', label: 'BS14LZGP'},
    { value: 'LB48XNGP', label: 'LB48XNGP'},
    { value: 'LB48XVGP', label: 'LB48XVGP'},
    { value: 'LC47GHGP', label: 'LC47GHGP'}

  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };  

  const FuelKiloForm = () => {
    const [selectedName, setSelectedName] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [fuel, setFuel] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUserId(user.uid);
        } else {
          navigate('/login');
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
  
    const handleNameChange = (selectedOption) => {
      setSelectedName(selectedOption);
      setError(''); // Clear error when name is changed
    };
  
    const handleVehicleChange = (selectedOption) => {
      setSelectedVehicle(selectedOption);
      setError(''); // Clear error when vehicle is changed
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!selectedName) {
        setError('Please select a name.');
        return;
      }
      if (!selectedVehicle) {
        setError('Please select a vehicle registration.');
        return;
      }
      try {
        await addDoc(collection(db, 'fuelKiloRecords'), {
          userId,
          name: selectedName.value,
          vehicleRegistration: selectedVehicle.value,
          fuel,
          kilometers,
          timestamp: new Date(),
        });
        setError(''); // Clear any existing errors
        alert('Form submitted successfully');
        // Clear the form
        setSelectedName(null);
        setSelectedVehicle(null);
        setFuel('');
        setKilometers('');
      } catch (e) {
        console.error('Error adding document: ', e);
        setError('Failed to submit the form. Please try again.');
      }
    };
  
    return (
      <div className="form-container">
        <h2>Fuel and Kilometer Capture Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Select Name:
              <Select
                styles={customStyles}
                options={names}
                value={selectedName}
                onChange={handleNameChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Select Vehicle Registration:
              <Select
                styles={customStyles}
                options={vehicleRegistrations}
                value={selectedVehicle}
                onChange={handleVehicleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Fuel (liters):
              <input
                type="number"
                inputMode="numeric"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Kilometers:
              <input
                type="number"
                inputMode="numeric"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                required
              />
            </label>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Submit</button>
          <button onClick={handleLogout} style={{ float: 'right', margin: '10px', }}>Logout</button>
        </form>
      </div>
    );
  };
  
  export default FuelKiloForm;