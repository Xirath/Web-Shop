
import DashboardCard from "./DashboardCard"

export default function DashBoardCards() {

  return(
    <div className="grid grid-cols-4 gap-2">

      <DashboardCard title="PRODUCTS"
       count={193} 
      
        color="blue"
         />

      <DashboardCard title="IN STOCK"
       count={169}
       color="green"
       />
    

      <DashboardCard title="LOW STOCK" 
      count={20}
      color="orange"
      />
      
    

      <DashboardCard title="OUT OF STOCK" 
      count={4}
      color="red"
      />
      
      
  
    </div>
  );

}






