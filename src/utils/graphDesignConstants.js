export const chartThemeColorsArray = [
  "#ff5003", "#ff8e00", "#003f7d", "#3CB371", "#FFEE33", "#b24478",
  "#f0423d", "#f7a644", "#00ac69", "#0b85c3", "#faed37", "#E0115f",
  "#f4803f", "#fac93d", "#00b2a9", "#00b9e4", "#a2ca5e", "#EC5578"
]


export const getInitDoughnutGraphOptions = (title = "", initDataArr = [{name: "", y: 0}]) =>{
  const initGraphObj = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize:25,
      fontWeight: 700,
      fontFamily: "Noto Sans"
    },
    colorSet: "themeColors",
    data: [{
      indexLabelFontSize:17,
      indexLabelFontWeight: 400,
      indexLabelFontFamily: "Noto Sans",
      type: "doughnut",
      indexLabelMaxWidth: 200,  
      indexLabelWrap: true,
      indexLabel: "{name} {y}",
      yValueFormatString: "₩#,###.##",
      dataPoints: initDataArr
    }]
  }

  return initGraphObj
}