/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class HomeViewModel extends next2d.fw.ViewModel
{
    /**
     * @param {next2d.fw.View} view
     * @constructor
     * @public
     */
    constructor (view)
    {
        super(view);
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
            const { MouseEvent } = next2d.events;
            const { TextField, TextFieldAutoSize, TextFormat } = next2d.text;

            const parent = view.addChild(new Sprite());

            let positionX = 0;
            let positionY = 0;

            // ゲームで得点加算される倍数の値、2から9までの選択肢を表示
            const numbers = this.config.game.numbers;
            for (let idx = 0; numbers.length > idx; ++idx) {

                const number = numbers[idx];

                // 半分で改行
                if (numbers.length / 2 === idx) {
                    positionX  = 0;
                    positionY += 60;
                }

                const sprite = parent.addChild(new Sprite());

                // ボタンの角丸矩形を生成
                sprite
                    .graphics
                    .beginFill("#7EA1C4")
                    .drawRoundRect(0, 0, 50, 50, 10);

                sprite.x = positionX;
                sprite.y = positionY;

                const textFormat = new TextFormat();
                textFormat.font  = "Arial";
                textFormat.size  = 20;
                textFormat.bold  = true;
                textFormat.color = "#1B365C";

                // 倍数をテキストとして表示
                const textField = new TextField();
                textField.defaultTextFormat = textFormat;

                textField.name     = "number";
                textField.autoSize = TextFieldAutoSize.CENTER;
                textField.text     = `${number}`;

                textField.x = (sprite.width  - textField.width)  / 2 - 1;
                textField.y = (sprite.height - textField.height) / 2;

                sprite.addChild(textField);

                sprite.buttonMode = true;
                sprite.addEventListener(MouseEvent.MOUSE_UP, (event) =>
                {
                    const target = event.currentTarget;

                    // 選択した倍数をQueryStringとしてゲームに引き継ぐ
                    this.app.gotoView(`game/play?number=${target.number.text}`);
                });

                positionX += sprite.width + 10;
            }

            parent.x = (this.config.stage.width  - parent.width)  / 2;
            parent.y = (this.config.stage.height - parent.height) / 2;

            resolve();
        })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    const { TextField, TextFormat } = next2d.text;

                    const textFormat = new TextFormat();
                    textFormat.font  = "Arial";
                    textFormat.size  = 12;
                    textFormat.color = "#1B365C";

                    const textField = view.addChild(new TextField());
                    textField.defaultTextFormat = textFormat;

                    textField.wordWrap  = true;
                    textField.multiline = true;
                    textField.text = "タップした数字の倍数を作る事で得点が加算され、タイムバーが回復します。";

                    textField.width = 220;
                    textField.x = (this.config.stage.width - 220) / 2;
                    textField.y = 370;

                    resolve();
                });
            });
    }
}