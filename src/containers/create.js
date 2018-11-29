import React, { Component } from 'react';
import { Button, Row, Card, Col, Input, Icon, Modal } from 'antd';
import linkState from 'linkstate';

import PaymentMethodService from '../backend/services/payments';
import FriendService from '../backend/services/friends';
import { relativeTimeThreshold } from 'moment';

class Create extends Component {
	constructor(props) {
		super(props);
		const id = localStorage.getItem('id');

		this.state = {
			addCard: false,
			addFriend: false,
			cards: [ { cardNumber: 1234123412341234 } ],
			friends: [],
			selectedFriends: [], // bitmap representing whether or not friend i  selected
			id,
			cardNumber: '',
			friendID: ''
		};

		this.enterPayScreen = this.enterPayScreen.bind(this);
		this.toggleCardModal = this.toggleCardModal.bind(this);
		this.toggleFriendModal = this.toggleFriendModal.bind(this);
		this.truncateNumber = this.truncateNumber.bind(this);
		this.postCardNumber = this.postCardNumber.bind(this);

		this.getCards = this.getCards.bind(this);
		this.getFriends = this.getFriends.bind(this);
	}

	componentDidMount() {
		// this.getCards();
		// this.getFriends();
	}

	async getCards() {
		const { id } = this.state;
		const cards = await PaymentMethodService.getAll(id);
		this.setState({ cards });
	}

	async getFriends() {
		const { id } = this.state;
		const friends = await FriendService.getAll(id);
		const selectedFriends = [];
		friends.forEach(() => {
			selectedFriends.push(false);
		});
		this.setState({ friends });
	}

	async enterPayScreen() {
		const { selectedFriends, friends } = this.state;
		const selected = [];
		selectedFriends.forEach((friend, i) => {
			if (friend) {
				selected.push(friends[i]);
			}
		});
		this.props.history.push('/pay', { friends: selected });
	}

	async postCardNumber() {
		const { cardNumber } = this.state;
		// await PaymentMethodService.add({cardNumber});
		//  this.getCards();
	}

	async addFriend() {
		const { id, friendID } = this.state;
		// await FriendService.add(id, friendID);
		//  this.getFriends();
	}

	toggleCardModal() {
		const { addCard } = this.state;
		this.setState({ addCard: !addCard });
	}

	toggleFriendModal() {
		const { addFriend } = this.state;
		this.setState({ addFriend: !addFriend });
	}

	selectFriend(idx) {
		// Flips bitmap
		const { selectedFriends } = this.state;
		const newSelected = [];
		selectedFriends.forEach((friend, i) => {
			if (i === idx) {
				newSelected.push(!friend);
			} else {
				newSelected.push(friend);
			}
    });
    


		this.setState({ selectedFriends: newSelected });
	}

	selectItem(elem) {
    // flip color
  }

	truncateNumber(num) {
		const tokens = num.toString();
		return tokens.slice(12, 17);
	}

	render() {
		const { friends, cards, addCard, addFriend } = this.state;
		const { truncateNumber, selectItem, selectFriend } = this;
		return (
			<div>
				<Modal
					title="Enter card information"
					visible={addCard}
					okText="Add card"
					onOk={this.postCardNumber}
					onCancel={this.toggleCardModal}
				>
					<Input
						placeholder="Card number"
						onInput={linkState(this, 'cardNumber')}
						style={{ margin: '8px' }}
					/>
          <Input
						placeholder="Expiration date (MM/YY)"
						style={{ margin: '8px' }}
					/>
          <Input
						placeholder="Name on card"
						style={{ margin: '8px' }}
					/>
          <Input
            placeholder="CVC"
            type="password"
						style={{ margin: '8px' }}
					/>
				</Modal>
				<Modal
					title="Search for friend"
					visible={addFriend}
					okText="Add friend"
					onOk={this.addFriend}
					onCancel={this.toggleFriendModal}
				>
					<Input
						placeholder="Friend username"
						onInput={linkState(this, 'friendID')}
						style={{ margin: '8px' }}
					/>
				</Modal>

				<Row style={{ marginTop: '4rem' }}>
					<Col span={10} offset={7}>
						<Card title="Create transaction">
							<Card type="inner" title="Change Payment?">
								<Row>
									{cards.map(function(card, i) {
										if (i < 5) {
											if (i === 0) {
												return (
													<Col span={4} key={i}>
														<a onClick={() => selectItem(this)} style={{ color: 'green' }}>
															<Icon type="credit-card" style={{ fontSize: '32px' }} />
															{truncateNumber(card.cardNumber)}
														</a>
													</Col>
												);
											}
											return (
												<Col span={4}>
													<a onClick={() => selectItem(this)}>
														<Icon type="credit-card" style={{ fontSize: '32px' }} />
														{truncateNumber(card.cardNumber)}
													</a>
												</Col>
											);
										}
									})}
									<Col>
										<a onClick={this.toggleCardModal}>
											<Icon type="plus" />
										</a>
									</Col>
								</Row>
							</Card>
							<Card style={{ marginTop: 16 }} type="inner" title="Choose Friends">
								<Row>
									{friends.map(function(friend, i) {
										if (i < 5) {
											return (
												<Col span={4}>
													<a onClick={() => selectFriend(i)}>
														<Icon type="person" style={{ fontSize: '32px' }} />
														{friend.id}
													</a>
												</Col>
											);
										}
									})}
									<Col>
										<a onClick={this.toggleFriendModal}>
											<Icon type="plus" />
										</a>
									</Col>
								</Row>
							</Card>
							<Button type="primary" style={{ marginTop: 16 }} onClick={this.enterPayScreen}>
								Start Transaction
							</Button>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Create;
