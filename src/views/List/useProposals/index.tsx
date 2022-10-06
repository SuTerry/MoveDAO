import { useEffect, useState } from 'react'

import { proposalsApi } from '@api/index'

import { ProsposalResponse } from '@api/proposals'

interface ProposalsResources {
  table: ProsposalResponse[]
  total: number
  tableHandle: string
  getNextTables: () => void
}

const useProposals = (): ProposalsResources => {
  const [tableHandle, setTableHandle] = useState('')
  const [currentNum, setCurrent] = useState(-1)
  const [table, setTable] = useState<ProsposalResponse[]>([])
  const [total, setTotal] = useState(0)

  const getTableHandle = async () => {
    const res = await proposalsApi.getTableHandle()
    if (res) {
      setCurrent(res.nextProposalId - 1)
      setTableHandle(res.handle)
      setTotal(res.nextProposalId)
    }
  }

  useEffect(() => {
    getTableHandle()
  }, [])

  useEffect(() => {
    getNextTables()
  }, [total])

  const getNextTables = async (num = 10) => {
    const resArr = []
    const nextTableNum = currentNum - num > -1 ? currentNum - num : -1
    let i

    for (i = currentNum; i > nextTableNum; i--) {
      resArr.push(proposalsApi.getProsposal(i + '', tableHandle))
    }
    setCurrent(i)
    try {
      const result = await Promise.all(resArr)
      setTable(table.concat(result))
    } catch (error) {

    }
  }

  return { table, total, tableHandle, getNextTables }
}

export default useProposals