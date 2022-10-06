import { Types } from 'aptos'
import Abstract from '@api/client'
import { PROPOSALS_ADDRESS } from '@api/config'


interface votingForumData {
  next_proposal_id: string
  proposals: {
    handle: string
  }
}

export interface getTableHandleResponse {
  nextProposalId: number
  handle: string
}

export interface ProsposalResponse {
  creation_time_secs: string
  description: string
  end_time: string
  is_resolved: boolean
  no_votes: string
  proposer: string
  start_time: string
  title: string
  yes_votes: string
  abstained_votes: string
}

interface VotesDetailResponse {
  records: {
    data: {
      key: string
      value: VotesDetail[]
    }[]
  }
}

export interface VotesDetail {
  proposer: string
  should_pass: number
}

class Proposals extends Abstract {

  address = PROPOSALS_ADDRESS

  async createProposal(data: Array<string | number>): Promise<void> {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${this.address}::governance::create_proposal`,
      type_arguments: [],
      arguments: data,
    }

    try {
      const { hash } = await window.aptos?.signAndSubmitTransaction?.(payload)
      return this.waitForTransaction(hash)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async getTableHandle(): Promise<getTableHandleResponse> {
    const result = { nextProposalId: 0, handle: '' }
    try {
      const accountResourcesResult = await this.getAccountResources()
      const votingForum = accountResourcesResult.find(resource => resource.type === `${this.address}::proposal::VotingForum`)
      if (!votingForum || !votingForum.data) return result
      const votingForumData = votingForum.data as votingForumData

      const nextProposalId = parseInt(votingForumData.next_proposal_id)
      const handle = votingForumData.proposals.handle

      return { nextProposalId, handle }
    } catch (error) {
      return result
    }
  }

  async getProsposal(proposalId: string, handle: string): Promise<ProsposalResponse> {
    const data = {
      key_type: "u64",
      value_type: `${this.address}::proposal::Proposal`,
      key: proposalId,
    }
    return this.getTableItem<ProsposalResponse>({ handle, data })


  }

  async vote(data: Array<number>) {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${this.address}::governance::vote`,
      type_arguments: [],
      arguments: data,
    }

    try {
      const { hash } = await window.aptos?.signAndSubmitTransaction?.(payload)
      return this.waitForTransaction(hash)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async getTableVotes(id: string): Promise<VotesDetail[]> {
    const result: VotesDetail[] = []
    try {
      const accountResourcesResult = await this.getAccountResources()
      const votingDetail = accountResourcesResult.find(resource => resource.type === `${this.address}::proposal::VotingDetail`)
      if (!votingDetail || !votingDetail.data) return result
      const VotingDetailData = (votingDetail.data as VotesDetailResponse).records.data.find(item => item.key === id)
      if (!VotingDetailData || !VotingDetailData.value) return result
      return result.concat(VotingDetailData.value)
    } catch (error) {
      return result
    }
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Proposals()
  return instance
})()