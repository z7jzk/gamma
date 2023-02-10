import React from 'react'
import env from "react-dotenv"
import { Bars } from 'react-loader-spinner'
import polaris_logo from '../assets/images/polaris_logo.png'
import './bom.css'
import { ButtonToolbar, Message, SelectPicker, Table } from 'rsuite'
import "rsuite/dist/rsuite.min.css"
import LoadingBars from '../shared/loading-bars'

const { Column, HeaderCell, Cell } = Table

class Bom extends React.Component<{}, { bom_data: any[], limit: number, offset: number, loading: boolean, sel_loading: boolean, model_number: string, business_units: string[], model_years: number[], site_ids: string[], product_lines: string[], model_list: any[], sel_business_unit: string, sel_model_year: number, sel_site_id: string, sel_product_line: string, txt_platform: string }> {
  constructor(props: any) {
    super(props)

    this.state = {
      bom_data: [{}],
      limit: 1000,
      offset: 0,
      model_number: 'R23RRU99AK',
      loading: false,
      sel_loading: false,
      business_units: [''],
      model_years: [],
      site_ids: [''],
      product_lines: [''],
      model_list: [{}], 
      sel_business_unit: '',
      sel_model_year: -1,
      sel_site_id: '',
      sel_product_line: '',
      txt_platform: ''
    }
  }

  componentDidMount() {
    if (this.state.business_units.length < 2) this.retrieveBusinessUnitDataFromServer()
    if (this.state.model_years.length < 2) this.retrieveModelYearDataFromServer()
    if (this.state.site_ids.length < 2) this.retrieveSiteIdsDataFromServer()
  }

  render() { 
    const data = this.state.bom_data
    const loading = this.state.loading
    const business_units = this.state.business_units
    const model_years = this.state.model_years
    const site_ids = this.state.site_ids
    const product_lines = this.state.product_lines
    const model_list = this.state.model_list

    const drop_business_units = business_units.map((b: string, index: number) => {
      return { label: b, value: b }
    })
    const drop_model_years = model_years.map((m: number, index: number) => {
      return { label: m, value: m }
    })
    const drop_site_ids = site_ids.map((s: string, index: number) => {
      return { label: s, value: s }
    })
    const drop_product_lines = product_lines.map((p: string, index: number) => {
      return { label: p, value: p }
    })
    const drop_model_list = model_list.map((m: any, index: number) => {
      return { MODEL_NUMBER: m.MODEL_NUMBER, MODEL_DESCRIPTION: m.MODEL_DESCRIPTION, PLATFORM: m.PLATFORM, COLOR: m.COLOR, COLOR_TYPE: m.COLOR_TYPE, ENGINE: m.ENGINE, Count_PART_NUMBER: m.Count_PART_NUMBER, STANDARD_UNIT_COST: m.STANDARD_UNIT_COST }
    })

    const result = data.map((bom: any, index: number) => {
      return <tr key={index}>
        <td className='tbl-val'>{bom.ENG_SEQ}</td>
        <td className='tbl-val'>{bom.ENG_SEQ_DESC}</td>
        <td className='tbl-val'>{bom.PARENT_PART_NUMBER}</td>
        <td className='tbl-val'>{bom.PARENT_PART_DESCRIPTION}</td>
        <td className='tbl-val'>{bom.PARENT_ITEM_TYPE}</td>
        <td className='tbl-val'>{bom.PART_NUMBER}</td>
        <td className='tbl-val'>{bom.PART_DESCRIPTION}</td>
        <td className='tbl-val'>{bom.ITEM_TYPE}</td>
        <td className='tbl-val'>{bom.PURCHASED_TYPE}</td>
        <td className='tbl-val'>{bom.QUANTITY_PER}</td>
        <td className='tbl-val'>{bom.UNIT_OF_MEASURE}</td>
        <td className='tbl-val'>{bom.VENDOR_NUMBER}</td>
        <td className='tbl-val'>{bom.VENDOR_NAME}</td>
        <td className='tbl-val'>{bom.BUYER_NUMBER}</td>
        <td className='tbl-val'>{bom.BUYER_NAME}</td>
        <td className='tbl-val'>{bom.COMMODITY_NUMBER}</td>
        <td className='tbl-val'>{bom.COMMODITY_CATEGORY}</td>
        <td className='tbl-val'>{bom.EFFECTIVE_DATE_FROM}</td>
        <td className='tbl-val'>{bom.EFFECTIVE_DATE_TO}</td>
        <td className='tbl-val'>{bom.COUNTRY_CODE}</td>
        <td className='tbl-val'>{bom.CURRENT_UNIT_COST}</td>
        <td className='tbl-val'>{bom.CURRENT_COST}</td>
        <td className='tbl-val'>{bom.ESTIMATED_COST}</td>
        <td className='tbl-val'>{bom.PART_PROJECT_NUMBER}</td>
        <td className='tbl-val'>{bom.PART_PROJECT_NAME}</td>
        <td className='tbl-val'>{bom.PART_PROJECT_MODEL_YEAR}</td>
      </tr>
    })

    return (
      <div className="container-fluid">
        <div className="row align-items-start mt-4 mx-5">
          <div className="col">
            <h1>BOM Retrieval</h1>
              { data.length == 1 ? 
                <ButtonToolbar className="mb-5 mt-3">
                  <SelectPicker label="BUSINESS UNIT" data={drop_business_units} style={{ width: 250 }} onChange={this.sel_business_unit} />
                  <SelectPicker label="MODEL YEAR" data={drop_model_years} style={{ width: 250 }} onChange={this.sel_model_year} />
                  <SelectPicker label="SITE ID" data={drop_site_ids} style={{ width: 250 }} onChange={this.sel_site_id} />
                  { drop_product_lines.length > 2 ?
                  <SelectPicker label="PRODUCT LINE" data={drop_product_lines} style={{ width: 250 }} onChange={this.sel_product_line} />
                  : null }
                </ButtonToolbar>
              : null }
              { drop_model_list.length > 1 && data.length == 1 ?
                <Table
                  height={400}
                  data={drop_model_list}
                  onRowClick={data => {
                    this.sel_model(data.MODEL_NUMBER)
                  }}
                  className='tbl-val mb-5 mt-3 tbl-click'
                >
                  <Column width={100} align="center" fixed>
                    <HeaderCell className='tbl-val'>MODEL_NUMBER</HeaderCell>
                    <Cell dataKey="MODEL_NUMBER" />
                  </Column>
                  <Column width={200} fixed>
                    <HeaderCell>MODEL_DESCRIPTION</HeaderCell>
                    <Cell dataKey="MODEL_DESCRIPTION" />
                  </Column>
                  <Column width={175}>
                    <HeaderCell>PLATFORM</HeaderCell>
                    <Cell dataKey="PLATFORM" />
                  </Column>
                  <Column width={225}>
                    <HeaderCell>COLOR</HeaderCell>
                    <Cell dataKey="COLOR" />
                  </Column>
                  <Column width={100}>
                    <HeaderCell>COLOR_TYPE</HeaderCell>
                    <Cell dataKey="COLOR_TYPE" />
                  </Column>
                  <Column width={200}>
                    <HeaderCell>ENGINE</HeaderCell>
                    <Cell dataKey="ENGINE" />
                  </Column>
                  <Column width={100}>
                    <HeaderCell className='tbl-val'>Count_PART_NUMBER</HeaderCell>
                    <Cell dataKey="Count_PART_NUMBER" />
                  </Column>
                  <Column width={100}>
                    <HeaderCell className='tbl-val'>STANDARD_UNIT_COST</HeaderCell>
                    <Cell dataKey="STANDARD_UNIT_COST" />
                  </Column>
                </Table>
                : null }
            <button type="button" className="btn btn-primary" onClick={this.retrieveBomDataFromServer}>Get BOM Data</button>
            <button type="button" className="btn btn-success ms-2" onClick={this.indexOffset}>Index Data</button>
            {data.length > 1 ? <table className='table table-striped table-light table-hover table-lg fs-8'>
              <thead>
                  <tr>
                    <th className='tw-1' scope="col">Eng Seq</th>
                    <th className='tw-1' scope="col">Eng Seq Desc</th>
                    <th className='tw-2' scope="col">Parent Part #</th>
                    <th className='tw-4' scope="col">Parent Part Desc</th>
                    <th className='tw-1' scope="col">Parent Part I/T</th>
                    <th className='tw-2' scope="col">Part #</th>
                    <th className='tw-4' scope="col">Part Desc</th>
                    <th className='tw-1' scope="col">Part I/T</th>
                    <th className='tw-3' scope="col">Purchased Type</th>
                    <th className='tw-1' scope="col">Qty Per</th>
                    <th className='tw-1' scope="col">UoM</th>
                    <th className='tw-2' scope="col">Vendor #</th>
                    <th className='tw-5' scope="col">Vendor Name</th>
                    <th className='tw-2' scope="col">Buyer #</th>
                    <th className='tw-5' scope="col">Buyer Name</th>
                    <th className='tw-2' scope="col">Commodity #</th>
                    <th className='tw-4' scope="col">Commodity Category</th>
                    <th className='tw-3' scope="col">Eff Date From</th>
                    <th className='tw-3' scope="col">Eff Date To</th>
                    <th className='tw-1' scope="col">Country Code</th>
                    <th className='tw-2' scope="col">Current Unit Cost</th>
                    <th className='tw-2' scope="col">Current Cost</th>
                    <th className='tw-2' scope="col">Estimated Cost</th>
                    <th className='tw-2' scope="col">Part Project #</th>
                    <th className='tw-5' scope="col">Part Project Name</th>
                    <th className='tw-1' scope="col">Part Project Model Year</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? null : result }
                </tbody>
            </table> : 
            <div className="row mt-4">
              <div className="col">
              <Message showIcon type='info'>
                No data to display
              </Message>
              </div>
            </div>}
            {loading ? <LoadingBars /> : null }
          </div>
        </div>
      </div>
    )
  }

  sel_business_unit = (val: any) => {
    console.log(`selected business unit: ${val}`)
    this.setState( { sel_business_unit: val }, () => {
      this.checkAndQueryProductLines()
    })
  }

  sel_model_year = (val: any) => {
    console.log(`selected model year: ${val}`)
    this.setState( { sel_model_year: val }, () => {
      this.checkAndQueryProductLines()
    })
  }

  sel_site_id = (val: any) => {
    console.log(`selected site id: ${val}`)
    this.setState( { sel_site_id: val }, () => {
      this.checkAndQueryProductLines()
    })
  }

  sel_product_line = (val: any) => {
    console.log(`selected product line: ${val}`)
    this.setState( { sel_product_line: val }, () => {
      this.checkAndQueryModels()
    })
  }

  sel_model = (val: any) => {
    console.log(`selected model: ${val}`)
    this.setState( { model_number: val }, () => {
      this.retrieveBomDataFromServer()
    })
    return val
  }

  checkAndQueryProductLines = () => {
    const business_unit = this.state.sel_business_unit
    const model_year = this.state.sel_model_year
    const site_id = this.state.sel_site_id
    
    if (business_unit !== '' && model_year > 0 && site_id !== '') {
      this.retrieveProductLinesDataFromServer()
    }
  }

  checkAndQueryModels = () => {
    const business_unit = this.state.sel_business_unit
    const model_year = this.state.sel_model_year
    const site_id = this.state.sel_site_id
    const product_line = this.state.sel_product_line
    
    if (business_unit !== '' && model_year > 0 && site_id !== '' && product_line !== '') {
      this.retrieveModelListDataFromServer()
    }
  }
  
  retrieveBomDataFromServer = () => {
    const limit = this.state.limit
    const offset = this.state.offset
    const model_number = this.state.model_number
    const api_key = env.CYGNUS_API_KEY

    this.setState({ loading: true }, () => {
      fetch(`http://localhost:3001/api/v1/sflk/bom_data/${model_number}?limit=${limit}&offset=${offset}`, {method: 'GET', headers: { 'api_key': api_key }})
      .then((res: any) => res.json())
      .then((res: any) => {
        this.setState({
          bom_data: res.data
        })
        this.setState({ loading: false })
      })
      .catch(err => {
        console.error(err)
      })
    })
  }
  
  retrieveBusinessUnitDataFromServer = () => {
    const api_key = env.CYGNUS_API_KEY
    fetch(`http://localhost:3001/api/v1/sflk/business_units`, {method: 'GET', headers: { 'api_key': api_key }})
    .then((res: any) => res.json())
    .then((res: any) => {
      let arr = res.data.map((el: any) => {
        return el.BUSINESS_UNIT
      })
      this.setState({
        business_units: arr
      })
      console.log(arr)
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  retrieveModelYearDataFromServer = () => {
    const api_key = env.CYGNUS_API_KEY
    fetch(`http://localhost:3001/api/v1/sflk/model_years`, {method: 'GET', headers: { 'api_key': api_key }})
    .then((res: any) => res.json())
    .then((res: any) => {
      let current_year = Number(new Date().getFullYear().toString().substring(1))
      let i: number
      let arr: number[] = []
      for (i = 0; i < res.data.length; i++) {
        if(res.data[i].MODEL_YEAR < (current_year + 5) && res.data[i].MODEL_YEAR > -1) {
          arr.push(res.data[i].MODEL_YEAR)
        }
      }
      this.setState({
        model_years: arr
      })
      console.log(arr)
      this.setState({ loading: false })
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  retrieveSiteIdsDataFromServer = () => {
    const api_key = env.CYGNUS_API_KEY
    fetch(`http://localhost:3001/api/v1/sflk/site_ids`, {method: 'GET', headers: { 'api_key': api_key }})
    .then((res: any) => res.json())
    .then((res: any) => {
      let arr = res.data.map((el: any) => {
        return el.SITE_ID
      })
      this.setState({
        site_ids: arr
      })
      console.log(arr)
      this.setState({ loading: false })
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  retrieveProductLinesDataFromServer = () => {
    const api_key = env.CYGNUS_API_KEY
    const business_unit = this.state.sel_business_unit
    const model_year = this.state.sel_model_year
    const site_id = this.state.sel_site_id

    this.setState({ sel_loading: true }, () => {
      fetch(`http://localhost:3001/api/v1/sflk/product_lines?business_unit=${business_unit}&model_year=${model_year}&site_id=${site_id}`, {method: 'GET', headers: { 'api_key': api_key }})
      .then((res: any) => res.json())
      .then((res: any) => {
        let arr = res.data.map((el: any) => {
          return el.PRODUCT_LINE
        })
        this.setState({
          product_lines: arr
        })
        console.log(arr)
        this.setState({ sel_loading: false })
      })
      .catch(err => {
        console.error(err)
      })
    })
  }
  
  retrieveModelListDataFromServer = () => {
    const api_key = env.CYGNUS_API_KEY
    const business_unit = this.state.sel_business_unit
    const model_year = this.state.sel_model_year
    const site_id = this.state.sel_site_id
    const product_line = this.state.sel_product_line
    const platform = this.state.txt_platform

    let platform_search = ''

    if (platform) {
      platform_search = `&platform=${platform}`
    }

    this.setState({ sel_loading: true }, () => {
      fetch(`http://localhost:3001/api/v1/sflk/model_list?business_unit=${business_unit}&model_year=${model_year}&site_id=${site_id}&product_line=${product_line}${platform_search}`, {method: 'GET', headers: { 'api_key': api_key }})
      .then((res: any) => res.json())
      .then((res: any) => {
        this.setState({
          model_list: res.data
        })
        this.setState({ sel_loading: false })
      })
      .catch(err => {
        console.error(err)
      })
    })
  }

  indexOffset = () => {
    this.setState({
      offset: (this.state.offset + this.state.limit)
    }, () => {
      this.retrieveBomDataFromServer()
    })
  }
}

export default Bom