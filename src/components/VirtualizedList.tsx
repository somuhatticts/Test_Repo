import React, { useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'

interface ListItem {
  id: number
  name: string
  email: string
  avatar: string
  description: string
}

// Generate mock data for demonstration
const generateListData = (count: number): ListItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    avatar: `https://i.pravatar.cc/50?img=${(index % 70) + 1}`,
    description: `This is a description for user ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  }))
}

interface ListItemProps {
  index: number
  style: React.CSSProperties
  data: ListItem[]
}

const ListItemComponent: React.FC<ListItemProps> = ({ index, style, data }) => {
  const item = data[index]
  
  return (
    <div style={style} className="list-item">
      <div className="list-item-content">
        <img 
          src={item.avatar} 
          alt={`Avatar for ${item.name}`}
          className="avatar"
          loading="lazy"
          width="50"
          height="50"
        />
        <div className="item-details">
          <h4 className="item-name">{item.name}</h4>
          <p className="item-email">{item.email}</p>
          <p className="item-description">{item.description}</p>
        </div>
        <div className="item-id">#{item.id}</div>
      </div>
    </div>
  )
}

const VirtualizedList: React.FC = () => {
  // Memoize the data to prevent unnecessary regeneration
  const listData = useMemo(() => generateListData(10000), [])

  return (
    <div className="virtualized-page">
      <header className="page-header">
        <h1>Virtualized List Demo</h1>
        <p>
          This list contains 10,000 items but only renders the visible ones, 
          maintaining smooth scrolling performance regardless of list size.
        </p>
      </header>

      <div className="performance-stats">
        <div className="stat">
          <strong>Total Items:</strong> {listData.length.toLocaleString()}
        </div>
        <div className="stat">
          <strong>Rendered Items:</strong> ~10-15 (only visible ones)
        </div>
        <div className="stat">
          <strong>Memory Usage:</strong> Constant (O(1))
        </div>
      </div>

      <div className="list-container">
        <List
          height={600}
          itemCount={listData.length}
          itemSize={120}
          itemData={listData}
          overscanCount={5} // Render 5 extra items for smoother scrolling
        >
          {ListItemComponent}
        </List>
      </div>

      <div className="optimization-notes">
        <h3>Optimization Techniques Used:</h3>
        <ul>
          <li><strong>Virtual Scrolling:</strong> Only visible items are rendered in the DOM</li>
          <li><strong>Memoization:</strong> Data generation is memoized to prevent recalculation</li>
          <li><strong>Lazy Loading:</strong> Images are loaded only when they become visible</li>
          <li><strong>Overscan:</strong> Pre-renders a few items outside viewport for smoother scrolling</li>
          <li><strong>Fixed Item Size:</strong> Consistent item heights for optimal performance</li>
        </ul>
      </div>
    </div>
  )
}

export default VirtualizedList