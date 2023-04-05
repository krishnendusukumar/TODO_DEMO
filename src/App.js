import React from "react";
import 'antd/dist/reset.css';
import { data, status } from './components/data'
import { useState } from "react";
import { Button, Table, Modal, Tag, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './App.css'





const App = () => {
  const [Data, setData] = useState(data)
  const [count, setCount] = useState(15);
  const [isEditting, setIsEditting] = useState(false);
  const [edit, setEdit] = useState(null);
  const [tag, setTag] = useState("")
  const [tagarr, setTagarr] = useState([])



  // var [date, setDate] = useState(new Date());
  // useEffect(() => {
  //   var timer = setInterval(() => setDate(new Date()), 1000)
  //   return function cleanup() {
  //     clearInterval(timer)
  //   }
  // })

  const handleAdd = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let name = month[d.getMonth()];
    let date = d.getDate();
    let time = d.getHours();
    let min = d.getMinutes();
    let timestamps = date + " " + name + " " + time + ":" + min;
    const newData = {
      "id": count,
      "timeStamp": timestamps,
      "Title": 'HEnter task',
      "Description": "Enter description",
      "Tags": [],
      "Status": "OPEN",
      "DUE_DATE": ""
    }
    setCount(count + 1)
    console.log(count)
    setData([newData, ...Data])
    setCount(count + 1)
    console.log(data)

    alert("Edit your task in actions")

  }

  const Delete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this",
      onOk: () => {
        setData((pre) => {
          return pre.filter((person) => person.id !== record.id);
        });
      },
    });
  };

  const Edit = (record) => {
    setIsEditting(true);
    setEdit({ ...record })
  };

  const resetEditting = () => {
    setIsEditting(false)
    setEdit(null)
  }

  const addTag = () => {
    setCount(count + 1);
    console.log("here i am")
    setTagarr(tag.split(','))
    console.log(tagarr)
    setEdit((pre) => {
      return { ...pre, Tags: tagarr };
    });
  }
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
              onClick={() => Edit(record)}
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


  return (
    <>
      <div className="app">
        <h2 className="heading">Make a list of tasks</h2>
        <div className="table">
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a Task
          </Button>
          <Table dataSource={Data} columns={columns}
            pagination={{ pageSize: 8, total: 50, showSizeChanger: true }}
          />
          <Modal
            title="Edit Details"
            open={isEditting}
            onCancel={() => {
              resetEditting()
              setTag()
            }}
            onOk={() => {
              setTagarr(tag.split(','))
              setData((pre) => {
                return pre.map((student) => {
                  if (student.id === edit.id) {
                    return edit;
                  } else {
                    return student;
                  }
                });
              });
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
              onChange={(e) => {
                setTag(e.target.value)
              }}
            />
            <Button onClick={addTag}> Add tag</Button>

            <Input
              placeholder="Enter the Due Date"
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, Due_Date: e.target.value };
                });
              }}
            />
            <Input
              placeholder="Enter the Status"
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, Status: e.target.value };
                });
              }}
            />
            <Button onClick={addTag}> Add Status</Button>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default App