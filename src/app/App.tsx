import { useState } from "react";
import { Aside } from "../shared/layout/Aside/Aside";
import { Main } from "../shared/layout/Main/Main";
import './app.scss'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleMainClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`app ${isSidebarOpen ? 'app--sidebar-open' : ''}`}>
      <aside className="app__aside">
        <Aside 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </aside>
     
      <main className="app__main" onClick={handleMainClick}>
        <Main 
          isSidebarOpen={isSidebarOpen}
          onBurgerClick={() => setIsSidebarOpen(prev => !prev)} 
        />
      </main>
    </div>
  )
}

export default App;
