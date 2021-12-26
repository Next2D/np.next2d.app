import { RedButtonContent } from "../../content/RedButtonContent";
import { GreenButtonContent } from "../../content/GreenButtonContent";
import { BlueButtonContent } from "../../content/BlueButtonContent";
import { YellowButtonContent } from "../../content/YellowButtonContent";

/**
 * @class
 * @extends {next2d.fw.Model}
 */
export class Logic extends next2d.fw.Model
{
    /**
     * @param {number} number
     * @constructor
     * @public
     */
    constructor (number)
    {
        super();

        /**
         * @description ランダムにボタンを生成する為の配列
         * @type {array}
         * @public
         */
        this.pieceList = [
            RedButtonContent,
            GreenButtonContent,
            BlueButtonContent,
            YellowButtonContent
        ];

        /**
         * @description スコア
         * @type {number}
         * @default 0
         * @public
         */
        this.score = 0;

        /**
         * @description 加点対象の倍数値
         * @type {number}
         * @public
         */
        this.number = number | 0;

        /**
         * @description タイムバーの減算数値
         * @type {number}
         * @default 0
         * @public
         */
        this.subNumber = 0;

        /**
         * @description タイムバーの固定x座標
         * @type {number}
         * @default 0
         * @public
         */
        this.maxX = 0;

        /**
         * @description 移動の対象となるDisplayObject
         * @type {MovieClip}
         * @default null
         * @public
         */
        this.moveDisplayObject = null;
    }

    /**
     * @param  {next2d.display.MovieClip} piece
     * @return {void}
     * @public
     */
    addButtonEvent (piece)
    {
        const { MouseEvent } = next2d.events;

        piece.buttonMode    = true;
        piece.mouseChildren = false;
        piece.addEventListener(MouseEvent.MOUSE_DOWN, (event) =>
        {
            const target = event.currentTarget;
            this.moveDisplayObject = target;

            const parent = target.parent;
            parent.setChildIndex(target, parent.numChildren - 1);
        });

        piece.addEventListener(MouseEvent.MOUSE_UP, () =>
        {
            this.moveDisplayObject = null;
        });

        piece.addEventListener(MouseEvent.ROLL_OVER, (event) =>
        {
            const target = event.currentTarget;
            if (this.moveDisplayObject
                && (!target.alpha
                    || this.moveDisplayObject.constructor === target.constructor)
            ) {

                switch (true) {

                    case this.moveDisplayObject.x === target.x && this.moveDisplayObject.y !== target.y:
                    case this.moveDisplayObject.y === target.y && this.moveDisplayObject.x !== target.x:
                        {
                            const { Tween } = next2d.ui;
                            const { Event } = next2d.events;

                            if (target.alpha) {

                                const job = Tween.add(this.moveDisplayObject,
                                    { "x": this.moveDisplayObject.x, "y": this.moveDisplayObject.y },
                                    { "x": target.x, "y": target.y },
                                    0, 0.05
                                );

                                job.addEventListener(Event.COMPLETE, this.movePiece.bind({
                                    "scope": this,
                                    "moveDisplayObject": this.moveDisplayObject,
                                    "target": target
                                }));

                                // 新しいピースを追加
                                const parent = this.moveDisplayObject.parent;
                                const piece = parent
                                    .addChildAt(this.createPiece(), parent.numChildren);

                                piece.x = this.moveDisplayObject.x;
                                piece.y = this.moveDisplayObject.y;

                                job.start();

                            } else {

                                const job = Tween.add(this.moveDisplayObject,
                                    { "x": this.moveDisplayObject.x, "y": this.moveDisplayObject.y },
                                    { "x": target.x, "y": target.y },
                                    0, 0.05
                                );

                                target.x = this.moveDisplayObject.x;
                                target.y = this.moveDisplayObject.y;

                                job.start();

                            }
                        }
                        break;

                    default:
                        break;
                }

                // reset
                this.moveDisplayObject = null;
            }
        });
    }

    /**
     * @return {void}
     * @public
     */
    movePiece ()
    {
        const scope  = this.scope;
        const target = this.target;

        const baseNumber   = this.moveDisplayObject.number.text | 0;
        const targetNumber = target.number.text | 0;
        const afterNumber  = baseNumber + targetNumber;

        const parent = this.moveDisplayObject.parent;
        this.moveDisplayObject.number.text = `${afterNumber}`;

        if (afterNumber % scope.number === 0) {

            const { Tween } = next2d.ui;
            const { Point } = next2d.geom;
            const { Event } = next2d.events;

            const view = scope.context.view;

            // タイマーの回復
            scope.recoveryTimeBar(afterNumber / scope.number);

            const point = parent.globalToLocal(new Point(
                view.score.x,
                view.score.y
            ));

            const job = Tween.add(
                this.moveDisplayObject,
                {
                    "x": this.moveDisplayObject.x,
                    "y": this.moveDisplayObject.y,
                    "alpha": 1
                },
                {
                    "x": point.x,
                    "y": point.y,
                    "alpha": 0
                },
                0, 0.25
            );

            job.addEventListener(Event.COMPLETE, scope.pointUp.bind({
                "scope": scope,
                "afterNumber": afterNumber,
                "target": target,
                "moveDisplayObject": this.moveDisplayObject
            }));

            job.start();

        }

        parent.removeChild(target);
    }

    /**
     * @return {void}
     * @public
     */
    pointUp ()
    {
        const scope       = this.scope;
        const afterNumber = this.afterNumber;
        const target      = this.target;
        const parent      = this.moveDisplayObject.parent;

        const piece = parent
            .addChildAt(scope.createPiece(), parent.numChildren);

        piece.x = target.x;
        piece.y = target.y;

        scope.score += afterNumber + afterNumber / scope.number;
        scope.context.view.score.text = `${scope.score}`;

        parent.removeChild(this.moveDisplayObject);
    }

    /**
     * @return {next2d.fw.Content}
     * @public
     */
    createPiece ()
    {
        // ランダムに選択
        const PieceClass = this.pieceList[Math.floor(Math.random() * 4)];

        const piece = new PieceClass();

        // ボタンとしてのイベントを追加
        this.addButtonEvent(piece);

        // パズルの数値をセット
        this.setNumber(piece);

        return piece;
    }

    /**
     * @param  {next2d.display.MovieClip} piece
     * @return {void}
     * @public
     */
    setNumber (piece)
    {
        piece.number.text = Math.floor(Math.random() * 8) + 1;
    }

    /**
     * @param  {TimeBarContent} content
     * @return {void}
     * @public
     */
    startTimer (content)
    {
        // 60秒で終了するよう設定
        const width = content.width;
        this.maxX   = content.bar.x;
        this.subNumber = width / this.config.game.timeLimit;

        // タイマースタート
        const timerId = setInterval(function ()
        {
            content.bar.x -= this.subNumber;
            if (Math.abs(content.bar.x) > width) {

                // ゲーム終了
                clearInterval(timerId);

                // 結果画面にシーン移動
                this.app.gotoView(
                    `game/result?score=${view.score.text}`
                );

            }
        }.bind(this), 1000);
    }

    /**
     * @param  {Number} number
     * @return {void}
     * @public
     */
    recoveryTimeBar (number)
    {
        const bar = this.context.view.timer.bar;
        bar.x += this.subNumber * number;
        bar.x = Math.min(bar.x, this.maxX);
    }

    /**
     * @param  {next2d.display.MovieClip} piece
     * @return {void}
     * @public
     */
    setLastPiece (piece)
    {
        piece.setLocalVariable("space", true);
        piece.alpha = 0;
        piece.buttonMode = false;
        piece.removeAllEventListener(MouseEvent.MOUSE_DOWN);
        piece.removeAllEventListener(MouseEvent.MOUSE_UP);
    }

}