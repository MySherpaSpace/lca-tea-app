function AppPageLayout({sideMenu, children}) {
  return(
    <>
      <div className="block"/>
      <div className="columns">
        <div className="column is-one-quarter">
          {sideMenu}
        </div>
        <div className="column is-three-quarters">
          {children}
        </div>
      </div>
    </>
  );
}
 
export default AppPageLayout;