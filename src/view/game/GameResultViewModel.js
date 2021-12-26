/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class GameResultViewModel extends next2d.fw.ViewModel
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
            const { TextField, TextFieldAutoSize, TextFormat } = next2d.text;

            const textFormat = new TextFormat();
            textFormat.font  = "Arial";
            textFormat.size  = 40;
            textFormat.bold  = true;
            textFormat.color = "#7EA1C4";

            const textField = new TextField();
            textField.defaultTextFormat = textFormat;
            textField.autoSize          = TextFieldAutoSize.CENTER;
            textField.thickness         = 3;
            textField.thicknessColor    = "#1B365C";
            textField.text              = "Score";

            textField.x = (this.config.stage.width  - textField.width)  / 2;
            textField.y = 80;

            view.addChild(textField);

            resolve();
        })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    // スコアを受け取って表示
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
                    textField.autoSize          = TextFieldAutoSize.CENTER;
                    textField.thickness         = 3;
                    textField.thicknessColor    = "#1B365C";
                    textField.text              = this.query.get("score");

                    textField.x = (this.config.stage.width  - textField.width)  / 2;
                    textField.y = 180;

                    view.addChild(textField);

                    resolve();
                });
            })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    // Homeに移動するテキスト
                    const { TextField, TextFieldAutoSize, TextFormat } = next2d.text;

                    const textFormat = new TextFormat();
                    textFormat.font  = "Arial";
                    textFormat.size  = 20;
                    textFormat.bold  = true;
                    textFormat.color = "#7EA1C4";

                    const textField = new TextField();
                    textField.defaultTextFormat = textFormat;
                    textField.autoSize          = TextFieldAutoSize.CENTER;
                    textField.thickness         = 3;
                    textField.thicknessColor    = "#1B365C";
                    textField.text              = "Back to Home";

                    textField.x = (this.config.stage.width  - textField.width)  / 2;
                    textField.y = 300;

                    view.addChild(textField);

                    resolve();
                });
            })
            .then(() =>
            {
                return new Promise((resolve) =>
                {
                    // HomeViewに移動
                    const { Sprite }     = next2d.display;
                    const { MouseEvent } = next2d.events;

                    // 透明なタップエリアを生成
                    const sprite = view.addChild(new Sprite());
                    const stage  = this.config.stage;
                    sprite
                        .graphics
                        .beginFill(0, 0)
                        .drawRect(0, 0, stage.width, stage.height);

                    // PC版でマウスがポインターに切り替わるように設定をONにする
                    sprite.buttonMode = true;

                    // マウスアップもしくはタップエンドでイベント発火
                    sprite.addEventListener(MouseEvent.MOUSE_UP, () =>
                    {
                        this.app.gotoView("home");
                    });

                    resolve();
                });
            });
    }
}