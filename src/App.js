import React, { useEffect, useRef } from "react";
import 'antd/dist/reset.css';
import { data, status } from './components/data'
import { useState } from "react";
import { Button, Table, Modal, Tag, Input, Select, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './App.css'
const { Option } = Select;





const App = () => {
  const [Data, setData] = useState(data)
  const [count, setCount] = useState(15);
  const [isEditting, setIsEditting] = useState(false);
  const [edit, setEdit] = useState(null);
  const TagRef = useRef();
  const [type, setType] = useState('')


  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      const items = JSON.parse(localStorage.getItem("todos"))
      setData(items)
    }
  }, [])

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //     Adding empty task row in the list

  const handleAdd = () => {
    const d = new Date();
    let name = month[d.getMonth()];
    let date = d.getDate();
    let time = d.getHours();
    let min = d.getMinutes();
    let timestamps = date + " " + name;
    const newData = {
      "id": count,
      "timeStamp": timestamps,
      "Title": '',
      "Description": "",
      "Tags": [],
      "Status": "OPEN",
      "DUE_DATE": ""
    }
    setCount(count + 1)
    Edit(newData, 'add')
  }



  //  Deleting a task from the list

  const Delete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this",
      onOk: () => {
        let newTodo = Data.filter((todo) => todo.id !== record.id)
        setData(newTodo);
        window.localStorage.setItem('todos', JSON.stringify(newTodo));
      },
    });
  };


  //  check if edit button is being clicked or not

  const Edit = (record, type) => {
    setIsEditting(true);
    setEdit({ ...record })
    setType(type);
  };

  // On pushing cancel button in edit mode

  const resetEditting = () => {
    console.log('i am called')
    setIsEditting(false)
    setEdit(null)
    TagRef.current = ''
    setType('');
  }

  // adding the tag in the list

  // hard code data bcz of unavailablity of suitable api

  const columns = [
    {
      id: "0",
      key: 'timeStamp',
      title: 'Created on',
      dataIndex: 'timeStamp',
    },
    {
      id: "1",
      key: "Title",
      title: "Title",
      dataIndex: "Title",
    },
    {
      id: "2",
      key: "Description",
      title: "Description",
      dataIndex: "Description",
    },
    {
      id: "3",
      key: 'Tags',
      title: 'Tags',
      dataIndex: 'Tags',
      render: tags => (
        <>
          {tags.map((tag) => {
            let color = "blue"
            color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === "Costly" || tag === "Toughest") color = "red"
            else if (tag === "Mild") color = "orange"
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      id: "4",
      key: "Status",
      title: "Status",
      dataIndex: "Status",
    },
    {
      id: "2",
      key: "Due_Date",
      title: "Due_Date",
      dataIndex: "Due_Date",
    },
    {
      id: "5",
      key: "action",
      title: "Actions",
      render: (record) => {
        return (
          <div className="flex">
            <EditOutlined
              style={{ color: "black" }}
              onClick={() => Edit(record, 'edit')}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => Delete(record)}
            />
          </div>
        );
      },
    },
  ]


  // useEffect(() => {
  //   localStorage.setItem('item', JSON.stringify(Data));
  // }, [Data])



  const handleStatusChange = (value) => {
    console.log(value)
    setEdit((pre) => {
      return { ...pre, Status: value };
    });
  }


  return (
    <>
      <div className="app">
        <h2 className="heading">Make a list of tasks</h2>
        <div className="table">

          <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: 16 }}>Add a Task</Button>


          <Table dataSource={Data} columns={columns}
            pagination={{ pageSize: 8, total: 50, showSizeChanger: true }}
          />

          {/* Modal imported from antd for edit section */}



          <Modal
            title={type === 'edit' ? "Edit Details" : "Add Task"}
            open={isEditting}
            onCancel={() => {
              resetEditting()
            }}
            onOk={() => {
              type === 'edit' ?
                setData((pre) => {
                  console.log(pre)
                  return pre?.map((student) => (student.id === edit.id) ? edit : student
                  );
                })
                : setData(pre => [edit, ...pre]);
              const localStorage = type === 'edit' ? Data : [edit, ...Data]
              window.localStorage.setItem('todos', JSON.stringify(localStorage));
              resetEditting()
            }}
            okText="Save"
            okType="dark"
          >
            <Input
              value={edit?.Title}
              placeholder="Enter the Title"
              maxLength={100}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, Title: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.Description}
              placeholder="Enter the Description"
              maxLength={1000}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, Description: e.target.value };
                });
              }}
            />
            <Input
              placeholder="Enter the Tag"
              value={edit?.Tags}
              onChange={(e) => {
                TagRef.current = e.target.value;
                setEdit((pre) => {
                  return { ...pre, Tags: TagRef.current.split(" ") }
                })
              }}
            />
            <DatePicker onChange={(date) => {
              const monthName = month[date.$M]
              setEdit((pre) => {
                return { ...pre, Due_Date: `${date.$D} ${monthName}` };
              });
            }}

            />
            <label htmlFor="">Status :</label>
            <Select defaultValue="Open"
              style={{ width: 100 }}
              onChange={(value) => handleStatusChange(value)}
            >
              <Option value="Open">Open</Option>
              <Option value="Active">Active</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default App

//comments added