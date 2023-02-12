import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Header from '../../../components/header/header'
import './SearchNGOs.css'

const SearchNGOs = () => {
    const [NGOs,setNGOs] = useState([]);
    useEffect(()=>{
        const fetchNGOs = async() =>{
            const res = await axios.get('http://localhost:8180/ngos');
            console.log(res.data);
            setNGOs(res.data);
        };
        fetchNGOs();
    },[]);//fetch all NGOs

    const columns = [{
        dataField: 'id',
        text: 'S.NO',
    }, {
        dataField: 'name',
        text: 'NAME',
        filter: textFilter()
    }, {
        dataField: 'type',
        text: 'TYPE',
        filter: textFilter()
    },{
        dataField: 'location',
        text: 'LOCATION',
        filter: textFilter()
    },{
        dataField: 'impact',
        text: 'IMPACT AREA',
        filter: textFilter()
    }];

    return (
        <div className="NGOS">
                <Header/>
                <BootstrapTable 
                    keyField='id' 
                    data={ NGOs } 
                    columns={ columns } 
                    filter={ filterFactory() } 
                />
         </div>
    )
}

export default SearchNGOs;