import { Link } from 'antd'
import {GitBranchIcon, StarFillIcon } from '@primer/octicons-react'

export function RepositoryItem(props) {
    return (
        <li>
            <a href={props.repository.html_url}>
              <h3>{props.repository.name}</h3>
              <p>{props.repository.description}</p>
              <p>{props.repository.language}</p>
              <div className="wrapper">
                <div className="wrapperIcon">
                <GitBranchIcon  className="icon" />
                  <p className="wrapperCount">{props.repository?.stargazers_count}</p>
                </div>
                <div className="wrapperIcon">
                  <StarFillIcon className="icon" />
                  <p className="wrapperCount">{props.repository?.forks_count}</p>
                </div>
              </div>
            </a>
        </li>
    )
}