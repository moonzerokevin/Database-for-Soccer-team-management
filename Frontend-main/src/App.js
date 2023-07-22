import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios"

function App() {



  const [inputValue1, setInputValue1] = useState('');

  const [formData, setFormData] = useState({ name: "", value: "" });
  const [formDataVenue, setFormDataVenue] = useState({ venue: "", price: "" });
  const [formDataPlayer, setFormDataPlayer] = useState({ teamName: "", playerType: "", playerName: "", jerseyNumber: "", skillPoint: "", salary: "" });
  const [formUpdateTable, setFormUpdateTable] = useState({ tableName: "", attributeName1: "", operation1: "", desiredValue1: "", operation2: "", attributeName2: "", operation3: "", desiredValue2: "" });
  const [formDataProjection, setFormDataProjection] = useState({ tableName: "", setOfAttributes: "" });
  const [formDataJoin, setFormDataJoin] = useState({ teamName: "" });
  const [formDataDelete, setFormDataDelete] = useState({ sName: "" });
  const [formDataTesting, setFormDataTesting] = useState({ name: "", testing: "" });



  const [playerResult, setPlayerResult] = useState(null);

  // useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setPlayerResult(response.data);
  //   });
  // }, []);


  function createPlayer() {
  }





  //------------------------------------------------------------------------------------------------
  const handleChange1 = (event) => {
    setInputValue1(event.target.value);
    // sendSQLRequest1(event.target.value)
  };







  //------------------------------------------------------------------------------------------------

  const handleChange4 = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeVenue = (event) => {
    const { name, value } = event.target;
    setFormDataVenue((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangePlayer = (event) => {
    const { name, value } = event.target;
    setFormDataPlayer((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeTable = (event) => {
    const { name, value } = event.target;
    setFormUpdateTable((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleProjection = (event) => {
    const { name, value } = event.target;
    setFormDataProjection((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleJoin = (event) => {
    const { name, value } = event.target;
    setFormDataJoin((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeDelete = (event) => {
    const { name, value } = event.target;
    setFormDataDelete((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeTesting = (event) => {
    const { name, value } = event.target;
    setFormDataTesting((prevFormData) => ({ ...prevFormData, [name]: value }));
  };













  //------------------------------------------------------------------------------------------------


  // working (Division)
  const handleButtonDivision = async () => {
    const result = await sendGetRequestForDivision();
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForDivision = async () => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Division
    `);
    return res.data
  }

  
  // working (Aggregation Having)
  const handleButtonAggregationHaving = async () => {
    const result = await sendGetRequestForAggregationHaving();
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForAggregationHaving = async () => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Aggregation_with_HAVING
    `);
    return res.data
  }

  
  // working (Youngest Coach)
  const handleButtonYoungestCoach = async () => {
    const result = await sendGetRequestForYoungestCoach();
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForYoungestCoach = async () => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Nested_Aggregation_with_GROUP_BY`);
    return res.data
  }


  // working (Average Salary)
  const handleButtonAverageSalary = async () => {
    const result = await sendGetRequestForAverageSalary();
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForAverageSalary = async () => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Aggregation_with_GROUP_BY`);
    return res.data
  }


  // working (Select)
  const handleSubmitSelect = async (event) => {
    event.preventDefault();
    alert(`Input message: Table Name: ${formUpdateTable.tableName}, Attribute One: ${formUpdateTable.attributeName1}, Operation One: ${formUpdateTable.operation1}, Desired Value One: ${formUpdateTable.desiredValue1}, Operation Two: ${formUpdateTable.operation2}, Attribute Two: ${formUpdateTable.attributeName2}, Operation Three: ${formUpdateTable.operation3}, Desired Value Two: ${formUpdateTable.desiredValue2}`);
    const result = await sendGetRequestForSelect(formUpdateTable.tableName, formUpdateTable.attributeName1, formUpdateTable.operation1, formUpdateTable.desiredValue1, formUpdateTable.operation2, formUpdateTable.attributeName2, formUpdateTable.operation3, formUpdateTable.desiredValue2);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForSelect = async (tableName, attributeName1, operation1, desiredValue1, operation2, attributeName2, operation3, desiredValue2) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Select/${tableName}/${attributeName1}/${operation1}/${desiredValue1}/${operation2}/${attributeName2}/${operation3}/${desiredValue2}`);
    return res.data
  }


  // working for (Delete)
  const handleSubmitDeleteS = async (event) => {
    event.preventDefault();
    alert(`Input message: ${formDataDelete.sName}`);
    const result = await sendDeleteSGetRequest(formDataDelete.sName);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendDeleteSGetRequest = async (sName) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/DELETE/${sName}`);
    return res.data
  }


  // working for (Projection)
  const handleSubmitProjection = async (event) => {
    event.preventDefault();
    alert(`Input message: Table Name: ${formDataProjection.tableName}, Attributes: ${formDataProjection.setOfAttributes}`);
    const result = await sendGetRequestForProjection(formDataProjection.tableName, formDataProjection.setOfAttributes);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForProjection = async (tableName, setOfAttributes) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/PROJECTION/${tableName}/${setOfAttributes}`);
    return res.data
  }


  // working for (JOIN)
  const handleSubmitJoin = async (event) => {
    event.preventDefault();
    alert(`Input message: ${formDataJoin.teamName}`);
    const result = await sendJoinGetRequest(formDataJoin.teamName);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendJoinGetRequest = async (teamName) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Join/${teamName}`);
    return res.data
  }


  // working for (UPDATE)
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    if (containsOnlyNumbers(formDataVenue.price) !== true || formDataVenue.price < 0){
      alert("You must entered a valid price");
      return;
    }
    alert(`Input message: Venue: ${formDataVenue.venue}, Price: ${formDataVenue.price}`);
    const result = await sendGetRequestForUpdate(formDataVenue.venue, formDataVenue.price);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequestForUpdate = async (venue, price) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/UPDATE/${price}/${venue}`);
    return res.data
  }


  // working for (TESTING ONLY)
  const handleSubmitTesting = async (event) => {
    event.preventDefault();
    alert(`TESTING input message: ${formDataTesting.testing}`);
    const result = await sendGetRequest(formDataTesting.testing);
    console.log(result)
    alert("result is: " + JSON.stringify(result))
  };
  const sendGetRequest = async (tableName) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Test1/${tableName}`);
    return res.data
  }


  // working (INSERT Player)
  const handlePlayer = async (event) => {
    event.preventDefault();
    const playerType = formDataPlayer.playerType;
    if (containsOnlyNumbers(formDataPlayer.salary) !== true || formDataPlayer.salary < 0) {
      alert("You must entered a valid salary");
      return;
    }
    if (containsOnlyNumbers(formDataPlayer.skillPoint) !== true || formDataPlayer.skillPoint < 1 || formDataPlayer.skillPoint > 100) {
      alert("You must entered a valid skill point");
      return;
    }
    if (containsOnlyNumbers(formDataPlayer.jerseyNumber) !== true || formDataPlayer.jerseyNumber < 0) {
      alert("You must entered a valid jersey number");
      return;
    }
    if (playerType === "Goalkeeper") {
      const result = await sendGetRequestForGoalkeeper(formDataPlayer.teamName, formDataPlayer.playerName, formDataPlayer.jerseyNumber, formDataPlayer.skillPoint, formDataPlayer.salary)
      alert(`Goalkeeper Player: ${formDataPlayer.playerName} is added to Team ${formDataPlayer.teamName}`)
      console.log(result)
      alert(`Return message: ${result["message"]}`)
    } else if (playerType === "Defender") {
      const result = await sendGetRequestForDefender(formDataPlayer.teamName, formDataPlayer.playerName, formDataPlayer.jerseyNumber, formDataPlayer.skillPoint, formDataPlayer.salary)
      alert(`Defender Player: ${formDataPlayer.playerName} is added to Team ${formDataPlayer.teamName}`)
      console.log(result)
      alert(`Return message: ${result["message"]}`)
    } else if (playerType === "Midfielder") {
      const result = await sendGetRequestForMidfielder(formDataPlayer.teamName, formDataPlayer.playerName, formDataPlayer.jerseyNumber, formDataPlayer.skillPoint, formDataPlayer.salary)
      alert(`Midfielder Player: ${formDataPlayer.playerName} is added to Team ${formDataPlayer.teamName}`)
      console.log(result)
      alert(`Return message: ${result["message"]}`)
    } else if (playerType === "Forward") {
      const result = await sendGetRequestForForward(formDataPlayer.teamName, formDataPlayer.playerName, formDataPlayer.jerseyNumber, formDataPlayer.skillPoint, formDataPlayer.salary)
      alert(`Forward Player: ${formDataPlayer.playerName} is added to Team ${formDataPlayer.teamName}`)
      console.log(result)
      alert(`Return message: ${result["message"]}`)
    } else {
      alert("You have entered a wrong player type: " + playerType);
      return
    }
  }
  const sendGetRequestForGoalkeeper = async (teamName, playerName, jerseyNumber, skillPoint, salary) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Insert/Goalkeeper/${playerName}/${jerseyNumber}/${teamName}/${skillPoint}/${salary}`);
    return res.data
  }
  const sendGetRequestForDefender = async (teamName, playerName, jerseyNumber, skillPoint, salary) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Insert/Defender/${playerName}/${jerseyNumber}/${teamName}/${skillPoint}/${salary}`);
    return res.data
  }
  const sendGetRequestForMidfielder = async (teamName, playerName, jerseyNumber, skillPoint, salary) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Insert/Midfielder/${playerName}/${jerseyNumber}/${teamName}/${skillPoint}/${salary}`);
    return res.data
  }
  const sendGetRequestForForward = async (teamName, playerName, jerseyNumber, skillPoint, salary) => {
    const res = await axios.get(`http://cpsc304nodeenv-env.eba-cpseb6s4.ca-central-1.elasticbeanstalk.com/Insert/Forward/${playerName}/${jerseyNumber}/${teamName}/${skillPoint}/${salary}`);
    return res.data
  }




  //------------------------------------------------------------------------------------------------
  // Check if string contains only numbers
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }





  //------------------------------------------------------------------------------------------------
  return (
    <div className="App">
      {/* <form>
        <label>Input Value:
          <input type="text" value={inputValue1} onChange={handleChange1} />
        </label>
        <p>Input Value: {inputValue1}</p>
      </form>
      <br /> */}


      <p>Database App</p>
      <br /><br />


      {/* working */}
      <form onSubmit={handlePlayer}>
        <label htmlFor="name">Team Name:</label>
        <input type="text" id="teamName" name="teamName" value={formDataPlayer.teamName} onChange={handleChangePlayer} />
        <label htmlFor="name">Player Type (enter "Goalkeeper" or "Defender" or "Midfielder" or "Forward"):</label>
        <input type="text" id="playerType" name="playerType" value={formDataPlayer.playerType} onChange={handleChangePlayer} />
        <label htmlFor="name">Player Name:</label>
        <input type="text" id="playerName" name="playerName" value={formDataPlayer.playerName} onChange={handleChangePlayer} />
        <label htmlFor="name">Player Salary in USD: </label>
        <input type="text" id="salary" name="salary" value={formDataPlayer.salary} onChange={handleChangePlayer} />
        <label htmlFor="name">Player Skill Points (enter between 1-100):</label>
        <input type="text" id="skillPoint" name="skillPoint" value={formDataPlayer.skillPoint} onChange={handleChangePlayer} />
        <label htmlFor="name">Player Jeysey Number:</label>
        <input type="text" id="jerseyNumber" name="jerseyNumber" value={formDataPlayer.jerseyNumber} onChange={handleChangePlayer} />
        <button type="submit">Add (INSERT)</button>
      </form>
      <br />
      <br />




      <form onSubmit={handleSubmitSelect}>
        <label htmlFor="name">Table Name:</label>
        <input type="text" id="tableName" name="tableName" value={formUpdateTable.tableName} onChange={handleChangeTable} />
        <label htmlFor="name">Attribute Name One:</label>
        <input type="text" id="attributeName1" name="attributeName1" value={formUpdateTable.attributeName1} onChange={handleChangeTable} />
        <label htmlFor="name">Operation One (enter: `&lt;` or '&gt;'):</label>
        <input type="text" id="operation1" name="operation1" value={formUpdateTable.operation1} onChange={handleChangeTable} />
        <label htmlFor="name">Desired Value One: </label>
        <input type="text" id="desiredValue1" name="desiredValue1" value={formUpdateTable.desiredValue1} onChange={handleChangeTable} />
        <label htmlFor="name">Operation Two (enter: "AND", or "OR", or "none"):</label>
        <input type="text" id="operation2" name="operation2" value={formUpdateTable.operation2} onChange={handleChangeTable} />
        <label htmlFor="name">Attribute Name Two:</label>
        <input type="text" id="attributeName2" name="attributeName2" value={formUpdateTable.attributeName2} onChange={handleChangeTable} />
        <label htmlFor="name">Operation Three (enter: `&lt;` or '&gt;'):</label>
        <input type="text" id="operation3" name="operation3" value={formUpdateTable.operation3} onChange={handleChangeTable} />
        <label htmlFor="name">Desired Value Two:</label>
        <input type="text" id="desiredValue2" name="desiredValue2" value={formUpdateTable.desiredValue2} onChange={handleChangeTable} />
        <button type="submit">Select (SELECT)</button>
      </form>
      <br />
      <br />



      {/* working */}
      <form onSubmit={handleSubmitUpdate}>
        <label htmlFor="name">Venue:</label>
        <input type="text" id="venue" name="venue" value={formDataVenue.venue} onChange={handleChangeVenue} />
        <label htmlFor="name">Price:</label>
        <input type="text" id="price" name="price" value={formDataVenue.price} onChange={handleChangeVenue} />
        <button type="submit">Change (UPDATE)</button>
      </form>
      <br />
      <br />


      {/* working */}
      <form onSubmit={handleSubmitProjection}>
        <label htmlFor="name">Table Name:</label>
        <input type="text" id="tableName" name="tableName" value={formDataProjection.tableName} onChange={handleProjection} />
        <label htmlFor="name">Set of attributes (separate by ","):</label>
        <input type="text" id="setOfAttributes" name="setOfAttributes" value={formDataProjection.setOfAttributes} onChange={handleProjection} />
        <button type="submit">View Selected (PROJECTION)</button>
      </form>
      <br />
      <br />


      {/* working */}
      <form onSubmit={handleSubmitJoin}>
        <label htmlFor="name">Team Name:</label>
        <input type="text" id="teamName" name="teamName" value={formDataJoin.teamName} onChange={handleJoin} />
        <button type="submit">View Result (JOIN)</button>
      </form>
      <br />
      <br />


      <form onSubmit={handleSubmitDeleteS}>
        <label htmlFor="name">Enter Sponsor Brand Name to delete:</label>
        <input type="text" id="sName" name="sName" value={formDataDelete.sName} onChange={handleChangeDelete} />
        <button type="submit">Remove (DELETE)</button>
      </form>
      <br />
      <br />


      {/* working */}
      <form onSubmit={handleSubmitTesting}>
        <label htmlFor="name">Check assets in table:</label>
        <input type="text" id="testing" name="testing" value={formDataTesting.testing} onChange={handleChangeTesting} />
        <button type="submit">TESTING ONLY (Check assets)</button>
      </form>
      <br />
      <br />

      <button onClick={handleButtonAverageSalary}>Show average salary for referee</button>
      <br />
      <br />

    
      <button onClick={handleButtonYoungestCoach}>Show the youngest coach</button>
      <br />
      <br />


      <button onClick={handleButtonAggregationHaving}>Aggregation with HAVING - Output: a table of team names along with the corresponding maximum salary of the goalkeepers, limited to teams with a maximum salary higher than 50000</button>
      <br />
      <br />


      <button onClick={handleButtonDivision}>Find the name of all sponsors that supports all teams</button>
      <br />
      <br />



    </div>
  );
}
export default App;
