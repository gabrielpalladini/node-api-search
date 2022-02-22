import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Checkbox } from 'antd';
import {
  faBars, faMap, faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IDatabase {
  name: string;
  city: string;
  specialities: string;
  distance: string;
}

export interface IDatabaseProps  {
  data: IDatabase[];
}

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = ['Excavation', 'Plumbing', 'Electrical'];

export const SearchBar: FC<IDatabaseProps> = ({
  data,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState([]);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkAll, setCheckAll] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const onChange = list => {
    setCheckedList(list);
    setCheckAll(list.length === checkBoxValue.length);
  };

  useEffect(() => {
    const filteredSpeciality = data?.map(e => e.specialities)

    const fetchedData = async () => {
      try {
        const dataFromAPI = await data;
      } finally {
        setSearchResults(data);
        setFiltered(data);
      }
    };

    fetchedData();
    console.log('data3', filtered);

    const uniqueArray = filteredSpeciality?.filter(function (item, pos) {
      return filteredSpeciality?.indexOf(item) === pos;
    });

    setCheckBoxValue(uniqueArray);
    console.log('inique array', uniqueArray);
  }, []);

  useEffect(() => {
    const results = searchResults?.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);

    console.log('results are', searchResults, 'filtered are', filtered);
  }, [searchTerm]);

  useEffect(() => {
    const checkedResults = filtered?.filter((item) => checkedList?.includes(item.specialities)).filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setSearchResults(checkedResults);

  }, [checkedList, checkAll, searchTerm]);

  return (
    <>
      <Header>
        <CompanyLogo>
          <img src={'https://www.cosuno.de/wp-content/themes/cosuno/assets/img/logo.svg'}/>
        </CompanyLogo>
        <Menu><FontAwesomeIcon icon={faBars} color={'rgb(58 78 112)'}/></Menu>

      </Header>

      <GlobalSearch>
        <input
          type="text"
          placeholder={'Search'}
          value={searchTerm}
          onChange={handleChange}
        />
        <CheckBox>
          <CheckboxGroup options={checkBoxValue} value={checkedList} onChange={onChange}/>
        </CheckBox>
      </GlobalSearch>

      <ListOfCompanies>
        {searchResults.map(item => (
          <PartnerBox>
            <LogoWrapper><img src={item.logo}/></LogoWrapper>
            <GeneralInfoWrapper>
              <CompanyName>{item.name}</CompanyName>
              <City>
                <FontAwesomeIcon icon={faMapPin} color={'white'}/>{item.city}
                <Distance><FontAwesomeIcon icon={faMap} color={'white'}/>{item.distance}</Distance>
              </City>
              <Specialities>{item.specialities}</Specialities>
            </GeneralInfoWrapper>

          </PartnerBox>))}
      </ListOfCompanies>
    </>
  );
};

const PartnerBox = styled.div`
  display: flex;
  border: 1px groove gray;

  height: 110px;
  padding: 20px;
  border-radius: 2px;
  margin: 0 15px 5px 15px;

  @media screen and (min-width: 600px) {
    min-width: 500px;
  }
`;

const LogoWrapper = styled.div`

  img {
    border-radius: 50%;
    max-width: 50px;
  }
`;

const GeneralInfoWrapper = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const CompanyName = styled.div`
  font-family: sans-serif;
  font-weight: 700;
  color: rgb(74 98 183);
`;
const Specialities = styled.div`
  border: 1px groove darkgray;
  background-color: gray;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px;
  margin: 10px 0;
`;

const City = styled.div`
  padding: 10px 0;
  font-size: 17px;
  display: flex;

  svg {
    padding-right: 10px;
  }
`;

const Distance = styled.div`
  font-size: 17px;
  padding-left: 20px;

  svg {
    padding-right: 10px;
  }
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  padding: 15px 0 15px 0;
  margin-right: 1px;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  height: 80px;
  z-index: 10;

  @media screen and (min-width: 600px) {
    padding: 15px;
  }
`;

const ListOfCompanies = styled.div`
  margin-top: 350px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 50px;
`;

const CheckBox = styled.div`
  color: black;
  padding: 20px 5px 0 5px;
  width: 90vw;

  @media screen and (min-width: 400px) {
    width: 90vw;
  }

  @media screen and (min-width: 600px) {
    width: 540px;
  }

  .ant-checkbox-group {
    width: 100%;
    color: white;
    font-family: sans-serif;

    @media screen and (min-width: 600px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .ant-checkbox {
    span {
      padding-left: 5px;
    }
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .ant-checkbox-input {
    width: 20px;
  }
`;

const CompanyLogo = styled.div`
  padding-left: 20px;
`;

const GlobalSearch = styled.div`
  position: fixed;
  top: 100px;
  width: 100%;
  height: 250px;
  z-index: 10;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    width: 90vw;
    height: 30px;
    border: 2px solid darkgray;
    border-radius: 3px;
    margin-left: -4px;

    @media screen and (min-width: 600px) {
      width: 534px;
    }
  }
`;

const Menu = styled.div`
  padding-right: 0;
  margin-right: 20px;
  cursor: pointer;

  svg {
    height: 30px;
  }

  @media screen and (min-width: 600px) {
    margin-right: 70px;
  }
`;
