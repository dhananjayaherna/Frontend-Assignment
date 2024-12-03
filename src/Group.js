import Card from "./Card";

function Group ({ icon, title, group}) {
  return (
    <div className="group">
      <div className="group-title">
        <div>
          {icon}
          <span style={{fontWeight: 'bold'}}>{title}</span> ({group.length})
        </div>
        <div>
          <button><img src="add.svg" alt="add"/></button>
          <button><img src="3-dot-menu.svg" alt="nothing"/></button>
        </div>
      </div>
      <div className="group-elements">
        {group.map(card => <Card id={card.id} title={card.title} tag={card.tag} status={card.status} />)}
      </div>
    </div>
  )
}

export default Group;