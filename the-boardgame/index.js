window.onload = onWindowLoad;

var mainPlayerGame;
var oponentGame;
var currentGame;

var diceValueElem;
var currentPlayerNameElem;
var diceElem = {
	dice1ValueElem: null,
	dice2ValueElem: null
};
var confirmSelectionBtnElem;
var scoreElem = {
	player1Score: null,
	player2Score: null
};
var skipRoundBtn;

///

function onWindowLoad() {
	var canvas = document.getElementById("canvas");
	currentPlayerNameElem = document.getElementById("currentPlayerName");
	confirmSelectionBtnElem = document.getElementById("confirmSelection");
	scoreElem.player1Score = document.getElementById("player1Score");
	scoreElem.player2Score = document.getElementById("player2Score");

	diceElem.dice1ValueElem = document.getElementById("dice1Value");
	diceElem.dice2ValueElem = document.getElementById("dice2Value");

	skipRoundBtn = document.getElementById("skipRound");

	var dimension = 16;
	mainPlayerGame = new Game(canvas, {
		playerName: 'Player 1',
		dimensionX: dimension,
		dimensionY: dimension,
		color: '#00f',
		oponentColor: '#f00',
		mainPlayer: true
	});
	oponentGame = new Game(canvas, {
		playerName: 'Player 2',
		dimensionX: dimension,
		dimensionY: dimension,
		color: '#00f',
		oponentColor: '#f00',
		mainPlayer: false
	});

	currentGame = oponentGame;
	switchCurrentPlayer();

	mainPlayerGame.registerGameListener(oponentGame);
	oponentGame.registerGameListener(mainPlayerGame);

	window.addEventListener('mouseup', function(evt) {
		currentGame.mouseUp(evt);
	});
	canvas.addEventListener('mouseup', function(evt) {
		currentGame.mouseUp(evt);
	});
	canvas.addEventListener('mousedown', function(evt) {
		currentGame.mouseDown(evt);
	});
	canvas.addEventListener('mousemove', function(evt) {
		currentGame.mouseMove(evt);
	});

	currentGame.startGame();
	rollDice();
}

function skipRound() {
	currentGame.cleanupSelection();
	switchCurrentPlayer();
}

function confirmSelection() {
	currentGame.confirmSelection();
	switchCurrentPlayer();
	diceElem.dice1ValueElem.innerHTML = '';
	diceElem.dice2ValueElem.innerHTML = '';

	confirmSelectionBtnElem.disabled = true;

	updateScoreLabels();
	rollDice();
}

function rollDice() {
	var dice1 = getRndInteger(1, 6);
	var dice2 = getRndInteger(1, 6);
	currentGame.setSelectionAreaLimit({
		dimensionA: dice1,
		dimensionB: dice2
	});
	diceElem.dice1ValueElem.innerHTML = dice1;
	diceElem.dice2ValueElem.innerHTML = dice2;

	confirmSelectionBtnElem.disabled = false;
}

function getRndInteger(min, max) {
    for (var i = 0; i < getRandom(0, 100); i++) {
    	getRandom(min, max);
    }
    return getRandom(min, max);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function switchCurrentPlayer() {
	rollDice();
	if (currentGame === mainPlayerGame) {
		currentGame = oponentGame;
	} else {
		currentGame = mainPlayerGame;
	}
	currentGame.startGame();
	currentPlayerNameElem.innerHTML = currentGame.playerName;
}

function updateScoreLabels() {
	scoreElem.player1Score.innerHTML = mainPlayerGame.getTotalScore();
	scoreElem.player2Score.innerHTML = oponentGame.getTotalScore();
}

///

function AreaBox(startBox, endBox) {
	if (!(this instanceof AreaBox)) {
		return new AreaBox(startBox, endBox);
	}

	this.startBox = startBox;
	this.endBox = endBox;
}

function Box(h, v) {
	if (!(this instanceof Box)) {
		return new Box(h, v);
	}

	this.boxHorizontal = h;
	this.boxVertical = v;
}

///

function Grid(canvasSize, settings) {
	if (!(this instanceof Grid)) {
		return new Grid();
	}

	this.drawGrid = function(ctx_) {
		ctx_.save();
		var gridLines = createGridLines(canvasSize);
		ctx_.strokeStyle = '#111';
		ctx_.globalAlpha = 0.1;
		drawLines(ctx_, gridLines);
		ctx_.restore();
	}

	function createGridLines(canvasSize) {
		var lines = [].concat(
			createVerticalLines(canvasSize, settings.boxesHorizontal),
			createHorizontalLines(canvasSize, settings.boxesVertical)
		);

		return lines;
	}

	function createVerticalLines(cavnasSize, numOfBoxes) {
		return Array(numOfBoxes).fill(null).map(function (item, index) {
			var xValue = (cavnasSize.width / numOfBoxes) * (index + 1);
			return {
				startX: xValue, startY: 0,
				endX: xValue, endY: cavnasSize.height
			};
		});
	}

	function createHorizontalLines(canvasSize, numOfBoxes) {
		return Array(numOfBoxes).fill(null).map(function (item, index) {
			var yValue = (canvasSize.height / numOfBoxes) * (index + 1);
			return {
				startX: 0, startY: yValue,
				endX: canvasSize.width, endY: yValue
			};
		});
	}

	function drawLines(ctx_, lines) {
		for (var i = 0; i < lines.length; i++) {
			ctx_.beginPath();
			ctx_.moveTo(lines[i].startX, lines[i].startY);
			ctx_.lineTo(lines[i].endX, lines[i].endY);
			ctx_.stroke();
		}
	}
}

///

function Game(canvas, opts) {
	if (!(this instanceof Game)) {
		return new Game();
	}

	var canvasSize = {
		width: canvas.width,
		height: canvas.height
	};

	var settings = {
		grid: {
			boxesHorizontal: opts.dimensionX,
			boxesVertical: opts.dimensionY
		},
		boxSize: {
			width: null,
			height: null
		},
		areaLimit: {
			dimensionA: 0,
			dimensionB: 0
		},
		color: opts.color || '#00f',
		oponentColor: opts.oponentColor || '#f00',
		startingCorner: {
			topLeft: opts.mainPlayer ? false : true,
			bottomRight: opts.mainPlayer ? true : false
		}
	};

	settings.boxSize.width = canvasSize.width / settings.grid.boxesHorizontal;
	settings.boxSize.height = canvasSize.height / settings.grid.boxesVertical;

	var ctx = canvas.getContext('2d');
	var grid = new Grid(canvasSize, settings.grid);
	var state = {
		mouse: {
			move: false,
			pos: { x: 0, y: 0 }
		},
		selection: {
			startBox: null,
			endBox: null
		},
		selectedAreas: [],
		oponentAreas: [],
		shadowBox: null
	};

	var statusListeners = [];

	/// 

	this.playerName = opts.playerName;

	this.startGame = function() {
		drawGame();
	};

	this.mouseUp = function(evt) {
		state.mouse.move = false;
		var pos = getMousePos(canvas, evt);
		if (state.selection.startBox !== null) {
			var box = calculateGameBoxForPos(pos);
			if (box !== null && isUnderLimit(state.selection.startBox, box)) {
				var newAreaAllowed = isNewAreaAllowed(AreaBox(state.selection.startBox, box));
				if (newAreaAllowed) {
					state.selection.endBox = box;
				} else {
					cleanupSelection();
				}
			}
		}
		drawGame();
	};

	this.mouseDown = function(evt) {
		cleanupSelection();
		state.mouse.move = true;
		state.mouse.pos = getMousePos(canvas, evt);
		var box = calculateGameBoxForPos(state.mouse.pos);
		if (box !== null) {
			var rules = isGameRulesSatisfied(box);
			if (rules.value) {
				state.selection.startBox = box;
				state.selection.endBox = box;
			} else {
				console.warn(rules.message);
			}
			drawGame();
		}
	};

	this.mouseMove = function(evt) {
		var pos = getMousePos(canvas, evt);
		var box = calculateGameBoxForPos(pos);
		state.shadowBox = null;
		if (box !== null) {
			if (state.mouse.move) {
				if (state.selection.startBox !== null) {
					var underLimit = isUnderLimit(state.selection.startBox, box);
					var newAreaAllowed = isNewAreaAllowed(AreaBox(state.selection.startBox, box));
					if (box !== null && underLimit && newAreaAllowed) {
						state.selection.endBox = box;
					}
				}
				drawGame();
			} else {
				if (isConnectedToExistingTerritory(box) && isInFreeTeritory(box)) {
					state.shadowBox = box;
					drawGame();
				}
			}
		}
	};

	this.confirmSelection = function() {
		storeSelection();
		cleanupSelection();
		drawGame();
		var lastStatus = state.selectedAreas[state.selectedAreas.length - 1];
		notifyListeners('selection-confirmed', lastStatus);
		settings.areaLimit = 0;
	};

	this.setSelectionAreaLimit = function(areaLimit) {
		settings.areaLimit = areaLimit;
	};

	this.registerGameListener = function(listener) {
		statusListeners.push(listener);
	};

	this.notify = function(type, data) {
		if (type === 'selection-confirmed') {
			state.oponentAreas.push(data);
		}
	};

	this.getTotalScore = function() {
		var value = 0;

		state.selectedAreas.forEach(function(area) {
			value += calculateAreaUnderBoxes(area.startBox, area.endBox);
		});

		return value;
	};

	this.cleanupSelection = cleanupSelection;

	////

	function notifyListeners(type, data) {
		statusListeners.forEach(function(listener) {
			listener.notify(type, data);
		});
	}

	function getMousePos(canvas_, evt) {
		var rect = canvas_.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	function calculateGameBoxForPos(pos) {
		var h = Math.floor(pos.x / (settings.boxSize.width)) + 1;
		var v = Math.floor(pos.y / (settings.boxSize.height)) + 1;

		if ((h > 0 && h <= settings.grid.boxesHorizontal) &&
			(v > 0 && v <= settings.grid.boxesVertical)) {
			return Box(h, v)
		} else {
			return null;
		}
	}

	function cleanupSelection() {
		state.selection.startBox = null;
		state.selection.endBox = null;
	}

	function storeSelection() {
		var mins = getMinMaxHV(state.selection.startBox, state.selection.endBox);
		var startBox = Box(mins.minH, mins.minV);
		var endBox = Box(mins.maxH, mins.maxV);
		var areaBox = AreaBox(startBox, endBox);
		state.selectedAreas.push(areaBox);
	}

	function drawGame() {
		ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
		grid.drawGrid(ctx);

		drawCurrentSelection(ctx);
		drawSelectedAreas(ctx);
		drawOponentAreas(ctx);

		if (state.shadowBox !== null) {
			drawShadowBox(ctx, state.shadowBox);
		}
	}

	function drawCurrentSelection(ctx_) {
		ctx_.save();

		ctx_.fillStyle = settings.color;
		ctx_.strokeStyle = settings.color;
		ctx_.lineWidth = 1;

		if (state.selection.startBox !== null && state.selection.endBox !== null) {
			var selectionAreaRect = calculateSelectionAreaRect(
				state.selection.startBox, state.selection.endBox
			);
			ctx_.strokeRect(
				selectionAreaRect.x, selectionAreaRect.y,
				selectionAreaRect.width, selectionAreaRect.height
			);
			ctx_.globalAlpha = 0.1;
			ctx_.fillRect(
				selectionAreaRect.x, selectionAreaRect.y,
				selectionAreaRect.width, selectionAreaRect.height
			);
		}

		ctx_.lineWidth = 1;
		ctx_.globalAlpha = 0.5;

		if (state.selection.startBox !== null) {
			var startPos = calculateBoxPos(state.selection.startBox);
			ctx_.strokeRect(startPos.x, startPos.y, settings.boxSize.width, settings.boxSize.height);
			ctx_.fillRect(startPos.x, startPos.y, settings.boxSize.width, settings.boxSize.height);
		}

		if (state.selection.endBox !== null) {
			var endPos = calculateBoxPos(state.selection.endBox);
			ctx_.strokeRect(endPos.x, endPos.y, settings.boxSize.width, settings.boxSize.height);
			ctx_.fillRect(endPos.x, endPos.y, settings.boxSize.width, settings.boxSize.height);
		}

		ctx_.restore();
	}

	function drawSelectedAreas(ctx_) {
		drawAreas(ctx_, state.selectedAreas, settings.color);
	}

	function calculateBoxPos(box) {
		var x = (box.boxHorizontal - 1) * settings.boxSize.width;
		var y = (box.boxVertical - 1) * settings.boxSize.height;

		return {
			x: x,
			y: y
		};
	}

	function drawOponentAreas(ctx_) {
		drawAreas(ctx_, state.oponentAreas, settings.oponentColor);
	}

	function drawAreas(ctx_, areas, color) {
		ctx_.save();

		areas.forEach(function (area) {
			var rect = calculateSelectionAreaRect(area.startBox, area.endBox);
			ctx_.globalAlpha = 0.3;
			ctx_.fillStyle = color;
			ctx_.fillRect(rect.x, rect.y, rect.width, rect.height);
			ctx_.strokeRect(rect.x, rect.y, rect.width, rect.height);

			var areaText = calculateAreaUnderBoxes(area.startBox, area.endBox) + '';
			drawTextInArea(ctx_, areaText, area);
		});

		ctx_.restore();
	}

	function calculateSelectionAreaRect(startBox, endBox) {
		var mins = getMinMaxHV(startBox, endBox);
		var minH = mins.minH;
		var maxH = mins.maxH;
		var minV = mins.minV;
		var maxV = mins.maxV;

		var rectTopLeft = calculateBoxPos(Box(minH, minV));
		var rectBottomLeft = calculateBoxPos(Box(maxH, maxV));

		var rect = {
			x: rectTopLeft.x, y: rectTopLeft.y,
			width: (rectBottomLeft.x - rectTopLeft.x) + settings.boxSize.width,
			height: (rectBottomLeft.y - rectTopLeft.y) + settings.boxSize.height
		};

		return rect;
	}

	function calculateAreaUnderBoxes(box1, box2) {
		var mins = getMinMaxHV(box1, box2);
		var numOfBoxesHoriz = mins.maxH - mins.minH + 1;
		var numOfBoxesVert = mins.maxV - mins.minV + 1;

		var area = numOfBoxesHoriz * numOfBoxesVert;
		return area;
	}

	function getMinMaxHV(box1, box2) {
		var minH = Math.min(
			box1.boxHorizontal,
			box2.boxHorizontal
		);
		var minV = Math.min(
			box1.boxVertical,
			box2.boxVertical
		);
		var maxH = Math.max(
			box1.boxHorizontal,
			box2.boxHorizontal
		);
		var maxV = Math.max(
			box1.boxVertical,
			box2.boxVertical
		);

		return {
			minH: minH, maxH: maxH,
			minV: minV, maxV: maxV
		};
	}

	function drawTextInArea(ctx_, areaText, area) {
		ctx_.save();
		var offset = settings.grid.boxesHorizontal < 32 ? 10 : 5;
		var rect = calculateSelectionAreaRect(area.startBox, area.endBox);
		ctx_.font = '15px Arial';
		var xValue = rect.x + rect.width / 2 - offset;
		ctx_.globalAlpha = 1;
		ctx_.fillStyle = 'black';
		ctx_.fillText(areaText, xValue, rect.y + rect.height / 2 + offset);
		ctx_.restore();
	}

	function drawShadowBox(ctx_, box) {
		ctx_.save();

		var pos = calculateBoxPos(box);
		ctx_.strokeStyle = 'black';
		ctx_.globalAlpha = 1;
		ctx_.strokeRect(pos.x, pos.y, settings.boxSize.width, settings.boxSize.height);

		ctx.restore();
	}

	function isGameRulesSatisfied(candidateBox) {
		if (state.selectedAreas.length === 0) {
			if (!isFirstBoxInBottomRightOrigin(candidateBox)) {
				return {
					value: false, 
					message: 'The first move is not in game origin'
				};
			}
		}
		if (state.selectedAreas.length > 0) {
			if (!isInFreeTeritory(candidateBox)) {
				return {
					value: false,
					message: 'Must be in free teritory'
				};
			}
		}
		if (state.selectedAreas.length > 0 && !isConnectedToExistingTerritory(candidateBox)) {
			return {
				value: false,
				message: 'Must be connected to existing teritory'
			};
		}

		return {
			value: true,
			message: null
		};
	}

	function isFirstBoxInBottomRightOrigin(box) {
		var value = true;

		if (settings.startingCorner.bottomRight) { 
			value = box.boxHorizontal === settings.grid.boxesHorizontal && 
				box.boxVertical === settings.grid.boxesVertical;
		} else if (settings.startingCorner.topLeft) {
			value = box.boxHorizontal === 1 && box.boxVertical === 1;
		}

		return value;
	}

	function isInFreeTeritory(box) {
		var areas = [].concat(state.selectedAreas).concat(state.oponentAreas);
		var value = true;

		for (var i = 0; i < areas.length; i++) {
			if (isBoxInArea(box, areas[i])) {
				value = false;
				break;
			}
		}

		return value;
	}

	function isBoxInArea(box, area) {
		var mins = getMinMaxHV(area.startBox, area.endBox);

		return (box.boxHorizontal >= mins.minH && box.boxHorizontal <= mins.maxH) &&
			(box.boxVertical >= mins.minV && box.boxVertical <= mins.maxV);
	}

	function isConnectedToExistingTerritory(box) {
		var value = false;

		for (var i = 0; i < state.selectedAreas.length; i++) {
			if (isBoxNeighborToArea(box, state.selectedAreas[i])) {
				value = true;
				break;
			}
		}

		return value;
	}

	function isBoxNeighborToArea(box, area) {
		var mins = getMinMaxHV(area.startBox, area.endBox);

		var leftRule = box.boxHorizontal === mins.minH - 1;
		var heightRule = box.boxVertical >= mins.minV && box.boxVertical <= mins.maxV;
		var topRule = box.boxVertical === mins.minV - 1;
		var widthRule = box.boxHorizontal >= mins.minH && box.boxHorizontal <= mins.maxH;
		var rightRule = box.boxHorizontal === mins.maxH + 1;
		var bottomRule = box.boxVertical === mins.maxV + 1;

		return (leftRule && heightRule) || (topRule && widthRule) || 
			(rightRule && heightRule) || (bottomRule && widthRule);
	}

	function isUnderLimit(box1, box2) {
		var mins = getMinMaxHV(box1, box2);
		var w = mins.maxH - mins.minH + 1;
		var h = mins.maxV - mins.minV + 1;
		var dimA = settings.areaLimit.dimensionA;
		var dimB = settings.areaLimit.dimensionB;

		return ((w <= dimA && h <= dimB) || (w <= dimB && h <= dimA));
	}

	function isNewAreaAllowed(newArea) {
		var value = true;

		var existingAreas = [].concat(state.selectedAreas).concat(state.oponentAreas);
		for (var i = 0; i < existingAreas.length; i++) {
			var area = existingAreas[i];

			if (isAreasIntersected(area, newArea)) {
				value = false;
				break;
			}
		}

		return value;
	}

	function isAreasIntersected(area1, area2) {
		var mins1 = getMinMaxHV(area1.startBox, area1.endBox);
		var mins2 = getMinMaxHV(area2.startBox, area2.endBox);

		if (mins1.maxV < mins2.minV || 
			mins1.maxH < mins2.minH ||
			mins1.minH > mins2.maxH || 
			mins1.minV > mins2.maxV) {
			return false;
		}
		return true;
	}
}

















