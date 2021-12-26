import { TimeBarContent } from "../../content/TimeBarContent";
import { Logic } from "../../model/game/Logic";

/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class GamePlayViewModel extends next2d.fw.ViewModel
{
    /**
     * @param {next2d.fw.View} view
     * @constructor
     * @public
     */
    constructor (view)
    {
        super(view);

        // ロジッククラスを生成
        this.logic = new Logic(this.query.get("number"));
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {Promise|void}
     * @public
     */
    bind (view)
    {
        return new Promise((resolve) =>
        {
            const { Sprite } = next2d.display;

            const sprite = view.addChild(new Sprite());

            let positionX = 0;
            let positionY = 0;

            // パズルのピースを生成
            const pieceCount = this.config.game.piece;
            for (let idx = 0; idx < pieceCount; ++idx) {

                for (let idx = 0; idx < pieceCount; ++idx) {

                    const piece = sprite.addChild(this.logic.createPiece());

                    piece.x = positionX;
                    piece.y = positionY;
                    positionX += piece.width + 10;

                }

                positionX  = 0;
                positionY += 125;
            }

            // 最後のピースは移動スペースなので非表示
            this.logic.setLastPiece(
                sprite.getChildAt(sprite.numChildren - 1)
            );

            // 枠に収まるサイズに縮小して中心にセット
            sprite.scaleX = sprite.scaleY = 0.4;
            sprite.x = (this.config.stage.width  - sprite.width)  / 2;
            sprite.y = (this.config.stage.height - sprite.height) / 2;

            resolve();
        })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    // スコア数値
                    const {
                        TextField,
                        TextFieldAutoSize,
                        TextFormat
                    } = next2d.text;

                    const textFormat = new TextFormat();
                    textFormat.font  = "Arial";
                    textFormat.size  = 40;
                    textFormat.bold  = true;
                    textFormat.color = "#7EA1C4";

                    const textField = new TextField();
                    textField.defaultTextFormat = textFormat;
                    textField.name              = "score";
                    textField.autoSize          = TextFieldAutoSize.CENTER;
                    textField.thickness         = 3;
                    textField.thicknessColor    = "#1B365C";
                    textField.text              = "0";

                    textField.x = (this.config.stage.width - textField.width) / 2;
                    textField.y = 40;

                    view.addChild(textField);

                    resolve();
                });
            })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    // タイムバー
                    const content = view.addChild(new TimeBarContent());
                    content.name  = "timer";

                    content.scaleX = content.scaleY = 0.8;
                    content.x = (this.config.stage.width - content.width) / 2;
                    content.y = 110;

                    this.logic.startTimer(content);

                    resolve();
                });
            });
    }
}