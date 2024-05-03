import React, { useState, useEffect} from 'react';
import OrganisationsList from '../../Components/OrganisationsList/OrganisationsList';
import { Helmet } from "react-helmet";
import './Organisations.scss'
import il_orgs from '../../Assets/il_orgs.svg';
import FilterSidebar from '../../Components/FilterSidebar/FilterSidebar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { BsChevronDoubleRight, BsChevronDoubleDown } from "react-icons/bs";
import getOrganisations from '../../Helper/getOrganisations';
import { set } from 'firebase/database';
import Loading from '../../Components/Loading/Loading';

// Initial filters state
const initialFilters = {
  categories: [],
  technology: [],
  year: [],
  program: [],
};

// Data for filters
const data = {
  categories: ['Open Source', 'Web Development', 'Mobile Development', 'Healthcare', 'Spatial Computing', 'Mathematics', 'Package Management', 'Environmental Science', 'Women in Computing'],
  technology: ['React', 'Angular', 'Vue', 'Python', 'C++', 'Java', 'JavaScript', 'Node.js', 'Ruby', 'Shell'],
  year: ['2020', '2021', '2022'],
  program: ['GSOC', 'Outreachy', 'Season of Docs'],
};


function Organisations() {
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    getOrganisations().then(
        (res)=>{
            const oss_details = res[0]
            setOrganisations(oss_details.organisations)
            setLoading(false);
        }
    )
}, []); 

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].includes(value)
        ? prevFilters[filterName].filter((v) => v !== value)
        : [...prevFilters[filterName], value],
    }));
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setShowFilterSidebar(!showFilterSidebar);
  };

  const filteredOrganisations = organisations.length > 0 && organisations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (loading ? <Loading/> :
    <div className="organisationsDiv">
      <Helmet>
        <title>Organisations</title>
      </Helmet>

      <div className="organisationsSection1Container">
        <img src={il_orgs} className="il_orgs" alt="OrgIllustration" />
        <div className="organisationsSection1">
          <h1>Organisations</h1>
        </div>
      </div>

      <div className="organisationSection2Container">
        <div className="filter-section">
          <button className="filter-button" onClick={toggleFilterSidebar}> {showFilterSidebar ? (
              <BsChevronDoubleDown />
            ) : (
              <BsChevronDoubleRight />
            )}</button>
        </div>
        <div className={` ${showFilterSidebar ? 'show' : 'organisationsFilterSection'}`}>
          <FilterSidebar initialFilters={initialFilters} data={data} onFilterChange={handleFilterChange} />
        </div>
       
{organisations.length > 0 ? (
  <div className={`organisationsListSection ${showFilterSidebar && "hide"}`}>
    <SearchBar value={searchTerm} onChange={handleSearchChange} placeholderText={"Organisations"}/>
    <OrganisationsList organisations={filteredOrganisations} filters={filters} />
  </div>
) : (
  <div>Loading...</div>
)}

      </div>
    </div>
  )
}

export default Organisations;
