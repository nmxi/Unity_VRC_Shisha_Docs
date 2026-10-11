---
id: custom-design
title: カスタムデザインシーシャ作成手順
sidebar_label: カスタムデザインシーシャ作成手順
description: オリジナルモデルの各 Unit と、Basic・Advanced 用 Prefab の作成手順。
---

:::tip[ヒント]

必ずしも全てのパーツをカスタムする必要はありません。必要な項目のみ参考にカスタムデザインを作成してみてください。

:::

:::warning[注意]

以下結構複雑で分かりにくいです。ごめんなさい。

:::

カスタムモデルの作成とセットアップを行うことで、シーシャのデザインを独自のものに変更できます。

また、作成したデザインはPrefab化してBoothなどで販売、頒布することも可能です。

頒布するファイルにはShishaSystem本体は含めないようにしてください。

## 1. シーシャのモデリングと各Unitの作成

基本的に`Assets/mikinel/Shisha/Prefabs/Reference` に入っている各部品(Unit)と同じものを作成します。

リファレンスFBXモデルをモデリングソフトに読み込ませて上書きする形でモデルの制作をするとスムーズに作業を進められるかもしれません。

:::info[補足]

リファレンスFBXモデル

[Shisha_Reference.fbx](/downloads/Shisha_Reference.fbx)

:::

:::warning[注意]

これから作成するPrefabは全て`Assets/mikinel/Shisha/Prefabs/Reference` 内のPrefabとスケールを合わせて作成することをおすすめします。大きさが極端に違う場合、ホースとのサイズが合わなかったりします。

:::

:::warning[注意]

ホースのデザインの変更はマテリアルを変更することでできますが、おすすめはしません。

:::

### シーシャ本体Unit

![シーシャ本体のリファレンスモデル](/img/notion/custom-design/figure-49.png)

シーシャ本体のリファレンスモデル

:::info[補足]

**モデルの仕様**

- ボトルに水が入っている
- (任意)ボトルの中に溜まっている煙を表現するメッシュが必要
- パイプを接続するための穴が必要
- トップを接続するための上部パイプが必要

:::

- モデルを作成し、ShishaBottleUnitコンポーネントをRootに追加します。
- EmptyObjectを作成し、サンプルと同様に水の中でぶくぶくする泡の発火点にPositionを調整し、ShishaBottleUnitコンポーネントのBubbleParticleAnchorTransformに設定します。
- 煙のモデルを作成した場合はマテリアルは`Assets/mikinel/Shisha/DataStore/TexMat/FakeSmoke.mat` を設定して下さい。
- 煙のモデルを作成した場合はShishaBottleUnitコンポーネントのBottleSmokeRendererに設定します。
- ざっくりとしたColliderを設定することでホースが本体に当たるようになります。Colliderの設定のIsTriggerはFalse、LayerをWalkthroughを設定してください。
- 設定が終わったらPrefab化しておきます。Prefab化する際は`Assets/mikinel/Shisha/Prefabs/Reference/BottleUnit/ShishaBottleUnit.prefab` と同じ大きさ感に合わせておきます。

![ShishaBottleUnitコンポーネントの設定](/img/notion/custom-design/figure-03.png)

ShishaBottleUnitコンポーネントの設定

### トップUnit

![トップのリファレンスモデル](/img/notion/custom-design/figure-14.png)

トップのリファレンスモデル

:::info[補足]

**モデルの仕様**

- フレーバが入っていることを表現するためのメッシュ

:::

- モデルを作成し、ShishaTopUnitコンポーネントを追加します。
- フレーバのメッシュには`mikinel/Shisha/DoubleColor` のシェーダを使用してください。
- ShishaTopUnitコンポーネントのFlavorObjectRendererにフレーバのメッシュを設定します。
- ShishaTopUnitコンポーネントのFlavorSmokeParticleAnchorTransformにはフレーバから出る煙の発火点を指定します。
- 設定が終わったらPrefab化しておきます。

![ShishaTopUnitコンポーネントの設定](/img/notion/custom-design/figure-25.png)

ShishaTopUnitコンポーネントの設定

### ヒートシステムUnit

![ヒートシステムのリファレンスモデル](/img/notion/custom-design/figure-36.png)

ヒートシステムのリファレンスモデル

:::info[補足]

**モデルの仕様**

- 炭を乗せるための受け皿

:::

- ヒートシステムは設定する項目はありません。
- 設定が終わったらPrefab化しておきます。

### フタUnit

![フタのリファレンスモデル](/img/notion/custom-design/figure-44.png)

フタのリファレンスモデル

:::info[補足]

**モデルの仕様**

- ヒートシステムに被せるフタ

:::

- フタは設定する項目はありません。
- 設定が終わったらPrefab化しておきます。

### パイプUnit

:::warning[注意]

パイプUnitのみ機能を直接組み込む必要があるため、パイプUnitのみ作成手順が複雑です。

:::

![パイプのリファレンスモデル](/img/notion/custom-design/figure-45.png)

パイプのリファレンスモデル

:::info[補足]

**モデルの仕様**

- 手で持って吸う部分

:::

#### a. パイプモデルPrefabの作成

まずパイプのモデルの子階層にホースが接続される部分にEmptyObjectを作成しておきます。

作成できたらPrefab化しておきます。

![子階層にAnchor(EmptyObject)を作成した様子](/img/notion/custom-design/figure-46.png)

子階層にAnchor(EmptyObject)を作成した様子

#### b. テンプレートを複製してパイプUnit Prefabを作成

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/PipeUnit_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![PipeUnit_Template.prefabを複製した直後の様子、名前はSamplePipeUnitと設定](/img/notion/custom-design/figure-47.png)

PipeUnit_Template.prefabを複製した直後の様子、名前はSamplePipeUnitと設定

#### c. パイプUnit Prefab内にパイプモデルを追加

aで作成したパイプモデルPrefabを配置します。

![SamplePipeUnit.Prefab内にPipe.Prefabが配置された状態](/img/notion/custom-design/figure-48.png)

SamplePipeUnit.Prefab内にPipe.Prefabが配置された状態

#### d. パイプモデルの位置を調整

パイプモデルの位置をホースの先端部と一致させて置きます。

![パイプ位置調整後の状態](/img/notion/custom-design/figure-04.png)

パイプ位置調整後の状態

#### e. パイプモデルを複製してPipeController用のオブジェクトを作成

パイプモデルを複製して、PipeConrollerなどと、コントローラーと分かりやすい名前に変更します。

分かりやすいように横に位置を移動させます。

マテリアルは`Assets/mikinel/Shisha/DataStore/TexMat/Controller.mat` を設定し、半透明にします。

![Pipeを複製し半透明のマテリアルを設定し、横に並べた状態](/img/notion/custom-design/figure-05.png)

Pipeを複製し半透明のマテリアルを設定し、横に並べた状態

#### f. PipeControllerコンポーネントを移植

SAMPLE_PIPE_CONTROLLERオブジェクト内のPipeControllerコンポーネントを、配置したPrefabに移動させます。

![SAMPLE_PIPE_CONTROLLERオブジェクトからPipeControllerコンポーネントを移動させている様子](/img/notion/custom-design/figure-01.gif)

SAMPLE_PIPE_CONTROLLERオブジェクトからPipeControllerコンポーネントを移動させている様子

#### g. PipeControllerの設定

PipeControllerコンポーネントのDistanceDetectTransformとTargetTransformを設定します。

- DistanceDetectTransformにはPipeController(半透明にした方)の子オブジェクトにある接続点(Anchor)オブジェクトを設定します。
- TargetTransformにはPipeオブジェクト自体を設定します。

![PipeControllerコンポーネントのDistanceDetectTransformとTargetTransformを設定した状態](/img/notion/custom-design/figure-06.png)

PipeControllerコンポーネントのDistanceDetectTransformとTargetTransformを設定した状態

#### h. PipeControllerオブジェクトをPickup可能にする

PipeControllerに以下のコンポーネントを追加します。

- Rigidbody
    - UseGravity = False, IsKinematic = Trueに設定

    ![Untitled](/img/notion/custom-design/figure-07.png)

- VRCPickup
    - AutoHold = Yes, UseText = Smokeに設定

    ![Untitled](/img/notion/custom-design/figure-08.png)

- MeshCollider
    - Convex = True, IsTrigger = Trueに設定

    ![Untitled](/img/notion/custom-design/figure-09.png)

- VRCObjectSync

![PipeControllerオブジェクトに追加されてコンポーネント](/img/notion/custom-design/figure-10.png)

PipeControllerオブジェクトに追加されてコンポーネント

#### i. SAMPLE_PIPE_CONTROLLERオブジェクトを削除

SAMPLE_PIPE_CONTROLLERオブジェクトを削除します。

![Untitled](/img/notion/custom-design/figure-11.png)

- 設定が終わったらPrefab化しておきます。

## 2. 各Unitを使用してギミック入りのPrefabを作成する

BasicモードとAdvancedモードで作成するPrefabが異なります。

### Prefabの作成(Basicモード用)

#### a. テンプレートからシーシャ本体のPrefabを作成する

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/Shisha_Basic_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![テンプレート複製後のPrefabの様子、メッシュなどは特に存在しません。](/img/notion/custom-design/figure-12.png)

テンプレート複製後のPrefabの様子、メッシュなどは特に存在しません。

#### b. 作成したシーシャ本体Unitを配置

先ほど作成したシーシャ本体UnitのPrefabを配置します。

![シーシャUnit Prefabを配置している様子](/img/notion/custom-design/figure-50.gif)

シーシャUnit Prefabを配置している様子

#### c. ShishaControllerの設定

ShishaControllerコンポーネントのShishaBottleUnitに、bで追加したオブジェクトを設定します。

![ShishaControllerのShishaBottleUnitを設定した状態](/img/notion/custom-design/figure-13.png)

ShishaControllerのShishaBottleUnitを設定した状態

#### d. シーシャ本体Unit以外のUnitを配置

その他のUnit(パーツ)もPrefabから配置し、位置の調整を行います。

![各Unitを配置した様子](/img/notion/custom-design/figure-15.png)

各Unitを配置した様子

![`Assets/mikinel/Shisha/Prefabs/Reference/CharcoalUnit/CharcoalUnit_Heated.prefab` から炭を配置することでリアリティが増します。](/img/notion/custom-design/figure-16.png)

`Assets/mikinel/Shisha/Prefabs/Reference/CharcoalUnit/CharcoalUnit_Heated.prefab` から炭を配置することでリアリティが増します。

#### e. パイプUnitの配置

先ほど作成したパイプUnitを配置します。

![パイプUnitを配置した状態](/img/notion/custom-design/figure-17.png)

パイプUnitを配置した状態

ホースの根本の位置が合うように調整します。

![ホースの根本の位置を合わせた状態](/img/notion/custom-design/figure-18.png)

ホースの根本の位置を合わせた状態

#### f. PipeControllerコンポーネントにShishaControllerを設定

PipeControllerオブジェクト内のPipeControllerコンポーネントにShishaControllerを設定します。

この設定を行うことでパイプをUseしたときにシーシャ本体から煙が吸えるようになります。

![PipeControllerコンポーネントにShishaControllerを設定した状態](/img/notion/custom-design/figure-19.png)

PipeControllerコンポーネントにShishaControllerを設定した状態

#### g. (ホースを複数接続したい場合)追加したパイプUnitを複製

複数のホースを接続する場合は e. で追加したパイプUnitを複製して位置の調整を行います。

![パイプUnitが複製された状態](/img/notion/custom-design/figure-20.png)

パイプUnitが複製された状態

#### h. 各オブジェクトの位置調整

テンプレートに初めから配置されているオブジェクトの位置調整を行います。

- ShishaControllerオブジェクトをフレーバの入っている位置に設定
    - フレーバを当てて煙の色を変更するときの当たり判定の位置になります。
- FlavorSmokeParticleオブジェクトをフレーバの煙の出る位置に設定
    - フレーバが温まっている表現に使う煙の出る位置になります。
- ResetInteractオブジェクトをフレーバをリセットするInteract位置に設定
    - 煙の色リセット用のUse判定が出る位置になります。

![ShishaControllerオブジェクト, FlavorSmokeParticleオブジェクト, ResetInteractオブジェクトの位置調整が行われた状態](/img/notion/custom-design/figure-21.png)

ShishaControllerオブジェクト, FlavorSmokeParticleオブジェクト, ResetInteractオブジェクトの位置調整が行われた状態

#### i. Prefabの保存

Prefabの保存を行います。

お疲れ様でした、このPrefabをワールドに配置することでBasicモードのシーシャシステムとして動作します。

### Prefabの作成(Advancedモード用)

Advancedモード用のPrefabはシーシャの機能に必要なパーツごとにPrefabを作成します。

#### シーシャ本体Prefabの作成

##### a. テンプレートからシーシャ本体のPrefabを作成する

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/Shisha_Advanced_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![テンプレート複製後のPrefabの様子、名前はSampleShishaAdvancedModeに設定しました。この時点ではメッシュなどは存在しません。](/img/notion/custom-design/figure-22.png)

テンプレート複製後のPrefabの様子、名前はSampleShishaAdvancedModeに設定しました。この時点ではメッシュなどは存在しません。

##### b. 作成したシーシャ本体Unitを配置

先ほど作成したシーシャ本体UnitのPrefabを配置します。

メッシュの底面が原点になるようにしてください。

![シーシャ本体Unit Prefabを配置している様子](/img/notion/custom-design/figure-50.gif)

シーシャ本体Unit Prefabを配置している様子

##### c. ShishaControllerの設定

ShishaControllerコンポーネントのShishaBottleUnitに、bで追加したオブジェクトを設定します。

![ShishaControllerのShishaBottleUnitを設定した状態](/img/notion/custom-design/figure-23.png)

ShishaControllerのShishaBottleUnitを設定した状態

##### d. 当たり判定の位置調整

ルートオブジェクト内のColliderの位置調整を行います。この当たり判定がシーシャ本体の当たり判定になります。小さすぎると手で取ろうとしたときに取りにくくなるので注意してください。

![当たり判定の位置調整を行った状態](/img/notion/custom-design/figure-24.png)

当たり判定の位置調整を行った状態

##### e. CombineBaseの位置調整

ShishaController_ShishaTopオブジェクトの位置を、トップが接続される位置に移動させます。この位置が後にトップのメッシュの底面の位置と一致するようになります。

![CombineBaseの位置を調整した状態](/img/notion/custom-design/figure-26.png)

CombineBaseの位置を調整した状態

##### f. Prefabの保存

#### トップPrefabの作成

##### a. テンプレートからトップのPrefabを作成する

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/Shisha_Advanced_Top_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![テンプレート複製後のPrefabの様子、名前はShisha_Topに設定しました。この時点ではメッシュなどは存在しません。](/img/notion/custom-design/figure-27.png)

テンプレート複製後のPrefabの様子、名前はShisha_Topに設定しました。この時点ではメッシュなどは存在しません。

##### b. トップUnitの配置

先ほど作成したトップUnitを配置します。

メッシュの底面が原点になるようにしてください。

![トップUnitを配置した状態](/img/notion/custom-design/figure-28.png)

トップUnitを配置した状態

##### c. ShishaFlavorDataコンポーネントにトップUnitを設定

Shsha_Topオブジェクト内にあるShishaFlavorDataコンポーネントのShishaTopUnitに、配置したトップUnitを設定します。

![ShishaFlavorDataコンポーネント内にShishaTopUnitを設定した状態](/img/notion/custom-design/figure-29.png)

ShishaFlavorDataコンポーネント内にShishaTopUnitを設定した状態

##### d. 当たり判定の位置調整

ルートオブジェクト内のColliderの位置調整を行います。この当たり判定がトップ自体の当たり判定になります。小さすぎると手で取ろうとしたときに取りにくくなるので注意してください。

![当たり判定の位置調整を行った状態](/img/notion/custom-design/figure-30.png)

当たり判定の位置調整を行った状態

##### e. CombineBaseの位置調整

Heat_CombineBaseオブジェクトの位置を、ヒートシステムが接続される位置に移動させます。この位置が後にヒートシステムの底面の位置と一致するようになります。

![HeatCombineBaseオブジェクトの位置が調整された状態](/img/notion/custom-design/figure-31.png)

HeatCombineBaseオブジェクトの位置が調整された状態

##### f. 各オブジェクトの位置調整

FxとFlavorSmokeParticleオブジェクトの位置をフレーバのオブジェクトの位置に移動させます。

- Fxはフレーバが設定されたときに表示されるエフェクトの位置になります。
- FlavorSmokeParticleはフレーバが温まったときに出る煙パーティクルの発火点になります。

![Fx, FlavorSmokeParticleの位置調整を行った状態](/img/notion/custom-design/figure-32.png)

Fx, FlavorSmokeParticleの位置調整を行った状態

##### g. Prefabの保存

#### ヒートシステムPrefabの作成

##### a. テンプレートからヒートシステムのPrefabを作成する

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/Shisha_Advanced_HeatSystem_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![テンプレート複製後のPrefabの様子、名前はSampleHeatSystemに設定しました。この時点ではメッシュなどは存在しません。](/img/notion/custom-design/figure-33.png)

テンプレート複製後のPrefabの様子、名前はSampleHeatSystemに設定しました。この時点ではメッシュなどは存在しません。

##### b. ヒートシステムUnitの配置

先ほど作成したヒートシステムUnitを配置します。

メッシュの底面が原点になるようにしてください。

![ヒートシステムUnitを配置した状態](/img/notion/custom-design/figure-34.png)

ヒートシステムUnitを配置した状態

##### c. CombineBaseの位置調整

Charcoal_CombineBaseオブジェクトの位置を調整して炭がちょうど良い位置になるように調整します。

![CombineBaseの位置を調節した状態](/img/notion/custom-design/figure-35.png)

CombineBaseの位置を調節した状態

##### d. 炭のモデルを削除

CharcoalUnitオブジェクトを選択し、削除します。

このモデルは c. のCombineBaseの位置調整用のものなので、削除してください。

![炭のモデルの削除を行う様子](/img/notion/custom-design/figure-37.png)

炭のモデルの削除を行う様子

##### e. 当たり判定の位置調整

ルートオブジェクト内のColliderの位置調整を行います。この当たり判定がヒートシステム自体の当たり判定になります。小さすぎると手で取ろうとしたときに取りにくくなるので注意してください。

![当たり判定の位置調整を行った状態](/img/notion/custom-design/figure-38.png)

当たり判定の位置調整を行った状態

##### f. CombineBaseの位置調整

Top_CombineBaseオブジェクトの位置を、フタが接続される位置に移動させます。この位置が後にフタの底面の位置と一致するようになります。

![Top_CombineBaseオブジェクトの位置調整を行った状態](/img/notion/custom-design/figure-39.png)

Top_CombineBaseオブジェクトの位置調整を行った状態

##### g. Prefabの保存

#### フタPrefabの作成

##### a. テンプレートからフタのPrefabを作成する

`Assets/mikinel/Shisha/Prefabs/CustomDesignTemplate/Shisha_Advanced_Cap_Template.prefab` を複製します。

複製後、分かりやすい名前に変更し、適宜フォルダを移動させておくと良いです。

![テンプレート複製後のPrefabの様子、名前はSampleCapに設定しました。この時点ではメッシュなどは存在しません。](/img/notion/custom-design/figure-40.png)

テンプレート複製後のPrefabの様子、名前はSampleCapに設定しました。この時点ではメッシュなどは存在しません。

##### b. フタUnitの配置

先ほど作成したフタUnitを配置します。

メッシュの底面が原点になるようにしてください。

![フタUnitを配置した状態](/img/notion/custom-design/figure-41.png)

フタUnitを配置した状態

##### c. 当たり判定の位置調整

ルートオブジェクト内のColliderの位置調整を行います。この当たり判定がフタ自体の当たり判定になります。小さすぎると手で取ろうとしたときに取りにくくなるので注意してください。

![当たり判定の位置調整を行った状態](/img/notion/custom-design/figure-42.png)

当たり判定の位置調整を行った状態

##### d. Prefabの保存

ここまでの作業が完了したときには以下のように4つのPrefabが完成した状態になります。

- シーシャ本体
- トップ
- ヒートシステム
- フタ

![作成した4つのPrefab](/img/notion/custom-design/figure-43.png)

作成した4つのPrefab

お疲れ様でした、このPrefabをワールドに配置することでAdvancedモードのシーシャシステムとして動作します。
