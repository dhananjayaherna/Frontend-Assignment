import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Group from './Group';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);

  const status = useMemo(() => ['In progress', 'Todo', 'Backlog', 'Done', 'Cancelled'], []);
  const priority = useMemo(() => ['No priority', 'Low', 'Medium', 'High', 'Urgent'], []);
  const [groupBy, setGroupBy] = useState('priority');
  const [orderBy, setOrderBy] = useState('title');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('group-by')) localStorage.setItem('group-by', groupBy);
    else if (localStorage.getItem('group-by') !== groupBy) setGroupBy(localStorage.getItem('group-by'));
    if (!localStorage.getItem('order-by')) localStorage.setItem('order-by', orderBy);
    else if (localStorage.getItem('order-by') !== orderBy) setOrderBy(localStorage.getItem('order-by'));
    if (!data || !user || !status) fetch(API_URL)
      .then(res => res.json())
      .then(({ tickets, users }) => {
        setUser(users);
        setData(tickets);
      });
  }, [data, user, status, groupBy, orderBy]);

  useMemo(() => {
    if (!data) return;
    switch (groupBy) {
      case 'priority': {
        setGroups(priority.map((pr, i) => ({
          title: pr,
          group: data.filter(d => d.priority === i).sort((a, b) => (a[orderBy] < b[orderBy]) ? -1 : 1)
        })).reverse());
        break;
      }
      case 'status': {
        setGroups(status.map(st => ({
          title: st,
          group: data.filter(d => d.status === st).sort((a, b) => (a[orderBy] < b[orderBy]) ? -1 : 1)
        })));
        break;
      }
      case 'user': {
        setGroups(user.map(u => ({
          title: u.name,
          group: data.filter(d => d.userId === u.id).sort((a, b) => (a[orderBy] < b[orderBy]) ? -1 : 1)
        })));
        break;
      }
      default: {
        setGroups(status.map(st => ({
          title: st,
          group: data.filter(d => d.status === st).sort((a, b) => (a[orderBy] < b[orderBy]) ? -1 : 1)
        })));
        break;
      }
    }
  }, [data, groupBy, orderBy, priority, status, user]);

  return (
    <div>
      <button id='filter' onClick={() => setVisible(!visible)}> Display </button><br />
      {visible && <div id='filter-box'>
        <b>Group By:</b> {['status', 'priority', 'user'].map(g => <>
          <input name={'group-by'} value={g} type='radio' checked={g === groupBy} onClick={() => {
            setGroupBy(g);
            localStorage.setItem('group-by', g);
          }} /> <label htmlFor={g}>{g[0].toUpperCase() + g.slice(1)}</label>
          &emsp;</>)}<br />
        <b>Order By:</b> {['title', 'priority'].map(o => <>
          <input name={'order-by'} value={o} type='radio' checked={o === orderBy} onClick={() => {
            setOrderBy(o);
            localStorage.setItem('order-by', o);
          }} /> <label htmlFor={o}>{o[0].toUpperCase() + o.slice(1)}</label>
          &emsp;</>)}
      </div>}
      <div id='group-container'>
        {groups.map(g => <Group title={g.title} group={g.group} />)}
      </div>
    </div>
  );
}

export default App;
