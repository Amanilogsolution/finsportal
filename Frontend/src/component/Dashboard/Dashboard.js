import React, { useEffect, useState } from 'react'
import { Compliancesduedate } from '../../api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [alertdiv, setAlertdiv] = useState(false);

  // const Tokentime = localStorage.getItem('ExpiredIn')
  // console.log(Tokentime+'000')

  //   setTimeout(() =>{ 
  //   localStorage.clear()
  //  },9000)

  useEffect(() => {
    const fetchData = async () => {
      const due_date = await Compliancesduedate(localStorage.getItem("Organisation"))
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      let num = 0;
      due_date.map((n) => {
        const datedi = due_date[num].due_date.split("-");
        num = num + 1;
        if (datedi[0] == yyyy) {
          if (datedi[1] == mm) {
            if ((datedi[2] - dd) == 4 || (datedi[2] - dd) == 3 || (datedi[2] - dd) == 2 || (datedi[2] - dd) == 1 || (datedi[2] - dd) == 0) {
              setAlertdiv(true);
            }
          }
        }
      }
      );
    }
    fetchData();
  }, [])


  const data = [
    {
      "sum": 506.00,
      "consignee": "BESTSELLER RETAIL INDIA PVT. Ltd."
    },
    {
      "sum": 11409.00,
      "consignee": "CROCUS BRANDS PVT. LTD."
    },
    {
      "sum": 620.00,
      "consignee": "METAPURE SUPPLEMENT PVT. LTD."
    },
    {
      "sum": 354.00,
      "consignee": "Mr. wsd ds"
    },
    {
      "sum": 1563.00,
      "consignee": "Nipro Medical India Pvt.Ltd."
    },
    {
      "sum": 736.00,
      "consignee": "VEEPEE ELECTRONICS"
    }
  ]

  const data2 = [
    {
      "sum": 1300.00,
      "cust_id": "CUST230001"
    },
    {
      "sum": 100.00,
      "cust_id": "CUST230005"
    },
    {
      "sum": 100.00,
      "cust_id": "CUST230007"
    },
    {
      "sum": 400.00,
      "cust_id": "CUST230011"
    },
    {
      "sum": 300.00,
      "cust_id": "CUST230102"
    }
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const vendorData = [
    {
      "sum": 499.00,
      "consignee": "A.A. Sanghariyat"
    },
    {
      "sum": 805.00,
      "consignee": "Abhishek Kumar Paswan"
    },
    {
      "sum": 304.00,
      "consignee": "Ahmedabad Bombay Roadlines"
    },
    {
      "sum": 4187.00,
      "consignee": "INDEV LOGISTICS PVT. LTD."
    },
    {
      "sum": 4533.00,
      "consignee": "Mr.RupeshKumar"
    }
  ]

  const DnData = [
    {
      "sum": 3000.00,
      "cust_id": "vou001"
    },
    {
      "sum": 190002.00,
      "cust_id": "VOU2300004"
    },
    {
      "sum": 3345.00,
      "cust_id": "VOU2300008"
    },
    {
      "sum": 278.00,
      "cust_id": "VOUCHER60041"
    }
  ]
  return (
    <div className={`content-wrapper`}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-2">
              <h1 className="">Dashboard</h1>
            </div>
            <div className="col-sm-9">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard 1</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>Total Sales</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>53</h3>
                  <p>Total Vendor</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
          <div className="row">
            <section className="col-lg-7 connectedSortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-stats-bars mr-1" />
                    Sales (Invoice)
                  </h3>
                  {/* <div className="card-tools">
                    <ul className="nav nav-pills ml-auto">
                      <li className="nav-item">
                        <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Bar Chart</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <BarChart width={600} height={306} data={data}>
                      <Bar dataKey="sum" fill="#8884d8" />
                      <XAxis dataKey="consignee" />
                      <YAxis dataKey="sum" />
                      <Tooltip />
                    </BarChart>
                  </div>
                </div>
              </div>
              {/* <div className="card direct-chat direct-chat-primary">
                  <div className="card-header">
                    <h3 className="card-title">Direct Chat</h3>
                    <div className="card-tools">
                      <span title="3 New Messages" className="badge badge-primary">3</span>
                      <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                        <i className="fas fa-comments" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                   <div className="card-body">
                    <div className="direct-chat-messages">
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">Alexander Pierce</span>
                          <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                        </div>
                        <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                        <div className="direct-chat-text">
                          Is this template really for free? That's unbelievable!
                        </div>
                      </div>
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">Sarah Bullock</span>
                          <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                        </div>
                        <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                        <div className="direct-chat-text">
                          You better believe it!
                        </div>
                      </div>
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">Alexander Pierce</span>
                          <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                        </div>
                        <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                        <div className="direct-chat-text">
                          Working with AdminLTE on a great new app! Wanna join?
                        </div>
                      </div>
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">Sarah Bullock</span>
                          <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                        </div>
                        <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                        <div className="direct-chat-text">
                          I would love to.
                        </div>
                      </div>
                    </div>
                    <div className="direct-chat-contacts">
                      <ul className="contacts-list">
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Count Dracula
                                <small className="contacts-list-date float-right">2/28/2015</small>
                              </span>
                              <span className="contacts-list-msg">How have you been? I was...</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Sarah Doe
                                <small className="contacts-list-date float-right">2/23/2015</small>
                              </span>
                              <span className="contacts-list-msg">I will be waiting for...</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nadia Jolie
                                <small className="contacts-list-date float-right">2/20/2015</small>
                              </span>
                              <span className="contacts-list-msg">I'll call you back at...</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nora S. Vans
                                <small className="contacts-list-date float-right">2/10/2015</small>
                              </span>
                              <span className="contacts-list-msg">Where is your new...</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                John K.
                                <small className="contacts-list-date float-right">1/27/2015</small>
                              </span>
                              <span className="contacts-list-msg">Can I take a look at...</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Kenneth M.
                                <small className="contacts-list-date float-right">1/4/2015</small>
                              </span>
                              <span className="contacts-list-msg">Never mind I found...</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <form action="#" method="post">
                      <div className="input-group">
                        <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                        <span className="input-group-append">
                          <button type="button" className="btn btn-primary">Send</button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div> */}

              {/* ######################### Purchases Cards Start ####################################### */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-stats-bars mr-1" />
                    Purchases (Bill)
                  </h3>

                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <BarChart width={600} height={306} data={vendorData}>
                      <Bar dataKey="sum" fill="#17A2B8" />
                      <XAxis dataKey="consignee" />
                      <YAxis dataKey="sum" />
                      <Tooltip />
                    </BarChart>
                  </div>
                </div>
              </div>
              {/* ######################### Purchases Cards End  ####################################### */}

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-clipboard mr-1" />
                    To Do List
                  </h3>
                  <div className="card-tools">
                    <ul className="pagination pagination-sm">
                      <li className="page-item"><a href="#" className="page-link">«</a></li>
                      <li className="page-item"><a href="#" className="page-link">1</a></li>
                      <li className="page-item"><a href="#" className="page-link">2</a></li>
                      <li className="page-item"><a href="#" className="page-link">3</a></li>
                      <li className="page-item"><a href="#" className="page-link">»</a></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="todo-list" data-widget="todo-list">
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                        <label htmlFor="todoCheck1" />
                      </div>
                      <span className="text">Design a nice theme</span>
                      <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                        <label htmlFor="todoCheck2" />
                      </div>
                      <span className="text">Make the theme responsive</span>
                      <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                        <label htmlFor="todoCheck3" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                        <label htmlFor="todoCheck4" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                        <label htmlFor="todoCheck5" />
                      </div>
                      <span className="text">Check your messages and notifications</span>
                      <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fas fa-ellipsis-v" />
                        <i className="fas fa-ellipsis-v" />
                      </span>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                        <label htmlFor="todoCheck6" />
                      </div>
                      <span className="text">Let theme shine like a star</span>
                      <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                      <div className="tools">
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-o" />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer clearfix">
                  <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Add item</button>
                </div>
              </div>
            </section>
            <section className="col-lg-5 connectedSortable">
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    {/* <i className="fas fa-map-marker-alt mr-1" /> */}
                    <i className="fas fa-chart-pie mr-1" />
                    Sales (Credit Notes)
                  </h3>
                  {/* <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                      <i className="far fa-calendar-alt" />
                    </button>
                    <button type="button" className="btn btn-primary btn-sm ml-2" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div> */}
                </div>
                <div className="card-body">
                  <PieChart width={400} height={260}>
                    <Pie
                      data={data2}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="sum"
                    >
                      <Tooltip />
                      {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                {/* <div className="card-footer ">
                  <div className="row">
                    <div className="col-4 text-center">
                      <div id="sparkline-1" />
                      <div className="text-dark">Visitors</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-2" />
                      <div className="text">Online</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-3" />
                      <div>Sales</div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* ################# Purchases Pie Charts Start ################# */}
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    {/* <i className="fas fa-map-marker-alt mr-1" /> */}
                    <i className="fas fa-chart-pie mr-1" />
                    Purchases (Debit Notes)
                  </h3>
                  {/* <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                      <i className="far fa-calendar-alt" />
                    </button>
                    <button type="button" className="btn btn-primary btn-sm ml-2" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div> */}
                </div>

                <div className="card-body">
                  <PieChart width={400} height={260}>
                    <Pie
                      data={DnData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="sum"
                    >
                      <Tooltip />
                      {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                {/* <div className="card-footer ">
                  <div className="row">
                    <div className="col-4 text-center">
                      <div id="sparkline-1" />
                      <div className="text-dark">Visitors</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-2" />
                      <div className="text">Online</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-3" />
                      <div>Sales</div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* ################# Purchases Pie Charts End ################# */}

              <div className="card bg-gradient-info">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="fas fa-th mr-1" />
                    Sales Graph
                  </h3>
                  <div className="card-tools">
                    <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus" />
                    </button>
                    <button type="button" className="btn bg-info btn-sm ml-1" data-card-widget="remove">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <canvas className="chart" id="line-chart" style={{ minHeight: 230, height: 250, maxHeight: 230, maxWidth: '100%' }} />
                </div>
                {/* <div className="card-footer bg-transparent">
                <div className="row">
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={0} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">Mail-Orders</div>
                  </div>
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={0} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">Online</div>
                  </div>
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={0} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">In-Store</div>
                  </div>
                </div>
              </div> */}
              </div>
              <div className="card bg-gradient-success">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" />
                    Calendar
                  </h3>
                  <div className="card-tools">
                    <div className="btn-group">
                      <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                        <i className="fas fa-bars" />
                      </button>
                      <div className="dropdown-menu" role="menu">
                        <a href="#" className="dropdown-item">Add new event</a>
                        <a href="#" className="dropdown-item">Clear events</a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">View calendar</a>
                      </div>
                    </div>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus" />
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="calendar" style={{ width: '100%' }} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {/*############################# compliances alert  ######################################*/}
      {alertdiv ?
        <div className='alert alert-dismissible fade show bg-secondary position-absolute overflow-auto' style={{ maxHeight: "400px", zIndex: "10", width: "350px",  top: "10%", right: "100px" }}>
          <small>Pending Compliances</small>
          <button type="button" className="close text-white " data-dismiss="alert" aria-label="Close" >
            <span aria-hidden="true" >&times;</span>
          </button>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Some Compliances are pending... </strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <button className='btn btn-primary float-right' onClick={() => { window.location.href = "./Panding-Compliances" }}>Compliances done</button>
        </div>
        : null}
      {/*############################# compliances alert  ################################*/}

    </div>

  )
}

export default Dashboard
