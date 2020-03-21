
import React, { Component, useState ,useEffect, useRef } from "react";
import MainGraph from "./MainGraph";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200
    }
  }
});
const dateToday = new Date();
const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "grid",
    width: "90%",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    textDecoration: "none"
  },
  graphFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    height: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formElements: {
    border: "1px solid #34AAC7",
    width: "100%"
  },
  InputsWrapper: {
    height: "2em",
    display: "grid",
    gridGap: "1em",
    gridTemplateColumns: "1fr 1fr"
  },
  inputBoxes: {
    margin: "1px"
  }
}));

const GraphContainer = () => {
  const classes = useStyles();
  var todayDate = new Date();
  var defaultStartDate = new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate())
  var defaultEndDate = new Date(todayDate.getFullYear(),todayDate.getMonth()+3,todayDate.getDate())

  const [MainGraphdata, setMainGraphData] = React.useState([])
  const [LineGraphdata, setLineGraphData] = React.useState([])

  const [startDate,setStartDate] = React.useState(defaultStartDate.toISOString().slice(0,10))
  const [endDate,setEndDate] = React.useState(defaultEndDate.toISOString().slice(0,10))
  const [salesType,setSalesType] = React.useState("quantity")
  const [distributionType,setDistributionType] = React.useState("realtor")
  const [isLoading,setisLoading] = useState(false)

  let graphDataLabels =[]
  let graphDataset=[]
  let graphDataId =[]
  

  
  let getDefaultData =() => {
    // setisLoading(true);
    fetch(`http://api.easyrealtysystem.wmdd.ca/reports/sales-distribution?${startDate}&${endDate}&${salesType}&${distributionType}`)
        .then(res => res.json())
        .then(res => {

          res.data.forEach(item => {
            graphDataLabels.push(item.label);
            graphDataset.push(item.value);
            graphDataId.push(item.ids)
          })
          // setisLoading(false)
          })
        .catch(err => {
          console.log(err, 'Fetch error')
          // setisLoading(false)
        })
  }

  const [mainGraphDataLabels, setMainGraphDataLabels] = React.useState(graphDataLabels)
  const [mainGraphDatasetsData, setMainGraphDatasetsData] = React.useState(graphDataset)
  const [mainGraphDataId, setMainGraphDataId] = React.useState(graphDataId)
  // const [isLoading,setisLoading] = useState(false)
  // graphDataLabels = [];
  // graphDataset =[];
  // graphDataId=[]
  useEffect(() => {
    getDefaultData();
    setisLoading(true)
    fetch(`http://api.easyrealtysystem.wmdd.ca/reports/sales-distribution?${startDate}&${endDate}&${salesType}&${distributionType}`)
        .then(res => res.json())
        .then(res => {
          setMainGraphData(res.data)
          setisLoading(false)
        })
        .catch(err => {
          console.log(err, 'Fetch error')
          setisLoading(false)
        })
  },[startDate,endDate,distributionType,salesType])
  
  

  useEffect(() => {
    
    // graphDataLabels = [];
    // graphDataset =[];
    // graphDataId=[]
    console.log(MainGraphdata)
    MainGraphdata.forEach(item => {
      graphDataLabels.push(item.label);
      graphDataset.push(item.value)
      graphDataId.push(item.ids)
    })

    setMainGraphDataLabels(graphDataLabels)
    setMainGraphDatasetsData(graphDataset)
    setMainGraphDataId(graphDataId)
    console.log("labels")
      console.log(mainGraphDataLabels)
      
  },[MainGraphdata])

  return (
    <ThemeProvider theme={theme}>
      <div className="graphFlex">
        <div style={{ width: "100%", margin: "auto"}}>
          <div className={classes.formContainer}>
            <Grid container>
              <Grid
                className={classes.inputBoxes}
                container
                item
                xm={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                From:
                <input
                  className={classes.formElements}
                  type="date"
                  id="startDate"
                  label="start date"
                  value={startDate}
                  onChange={(e)=>{setStartDate(e.target.value)}}
                />
              </Grid>

              <Grid
                className={classes.inputBoxes}
                container
                item
                xm={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                To:
                <input
                  className={classes.formElements}
                  type="date"
                  id="endDate"
                  label="end date"
                  value= {endDate}
                  onChange={(e)=>{setEndDate(e.target.value)}}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid
                className={classes.inputBoxes}
                container
                item
                xm={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                Show Sales By:
                <select id="datameasure" className={classes.formElements} defaultValue={salesType} onChange={(e)=>{setSalesType(e.target.value)}}>
                  <option value="quantity">Quantity</option>
                  <option value="revenue">Value</option>
                </select>
              </Grid>
              <Grid
                className={classes.inputBoxes}
                container
                item
                xm={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                Show Sales of:
                <select
                  id="distributionFactor"
                  className={classes.formElements}
                  defaultValue={distributionType}
                  onChange={(e)=>{setDistributionType(e.target.value)}}
                >
                  <option value="realtor">Realtor</option>
                  <option value="house">Type of Property</option>
                </select>
              </Grid>
            </Grid>
          </div>
          
          
          <div style={{backgroundColor:"white" , marginTop: "1em"}}>
          <h2>Sales Distribution</h2>
          <MainGraph
            salesType={salesType}
            distributionType={distributionType}
            isLoading={isLoading}
            graphDataId = {mainGraphDataId}
            data={{
              // labels: ["a","b","c","d"],
              labels: mainGraphDataLabels,
              datasets: [
                {
                  data: mainGraphDatasetsData,
                  backgroundColor: ["#2B879E", "#34AAC7", "#FCC29A", "#fde9c9"]
                }
              ]
            }}
          ></MainGraph>
          </div>
        </div>
       
      </div>
    </ThemeProvider>
  );
};

export default GraphContainer;
